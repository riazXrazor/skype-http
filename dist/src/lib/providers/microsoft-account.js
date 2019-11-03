"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const cheerio_1 = __importDefault(require("cheerio"));
const path_1 = __importDefault(require("path"));
const tough_cookie_1 = __importDefault(require("tough-cookie"));
const url_1 = __importDefault(require("url"));
const httpErrors = __importStar(require("../errors/http"));
const getLiveKeysErrors = __importStar(require("../errors/microsoft-account/get-live-keys"));
const getLiveTokenErrors = __importStar(require("../errors/microsoft-account/get-live-token"));
const getSkypeTokenErrors = __importStar(require("../errors/microsoft-account/get-skype-token"));
const login_1 = require("../errors/microsoft-account/login");
const wrong_credentials_1 = require("../errors/wrong-credentials");
const wrong_credentials_limit_1 = require("../errors/wrong-credentials-limit");
exports.skypeWebUri = "https://web.skype.com/";
exports.skypeLoginUri = "https://login.skype.com/login/";
exports.liveLoginUri = "https://login.live.com/";
exports.webClientLiveLoginId = "578134";
function login(options) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const liveKeys = yield getLiveKeys(options);
            const liveToken = yield getLiveToken({
                username: options.credentials.login,
                password: options.credentials.password,
                httpIo: options.httpIo,
                cookies: options.cookies,
                liveKeys,
            });
            return getSkypeToken({
                liveToken,
                cookies: options.cookies,
                httpIo: options.httpIo,
            });
        }
        catch (_err) {
            const err = _err;
            switch (err.name) {
                case getLiveKeysErrors.GetLiveKeysError.name:
                case getLiveTokenErrors.GetLiveTokenError.name:
                case getSkypeTokenErrors.GetSkypeTokenError.name:
                case wrong_credentials_1.WrongCredentialsError.name:
                case wrong_credentials_limit_1.WrongCredentialsLimitError.name:
                    throw login_1.MicrosoftAccountLoginError.create(err);
                default:
                    throw _err;
            }
        }
    });
}
exports.login = login;
function getLiveKeys(options) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const uri = url_1.default.resolve(exports.skypeLoginUri, path_1.default.posix.join("oauth", "microsoft"));
            const queryString = {
                client_id: exports.webClientLiveLoginId,
                redirect_uri: exports.skypeWebUri,
            };
            const getOptions = { uri, queryString, cookies: options.cookies };
            let response;
            try {
                response = yield options.httpIo.get(getOptions);
            }
            catch (err) {
                throw httpErrors.RequestError.create(err, getOptions);
            }
            let mspRequ;
            let mspOk;
            // Retrieve values for the cookies "MSPRequ" and "MSPOK"
            const cookies = new tough_cookie_1.default.CookieJar(options.cookies)
                .getCookiesSync("https://login.live.com/");
            for (const cookie of cookies) {
                switch (cookie.key) {
                    case "MSPRequ":
                        mspRequ = cookie.value;
                        break;
                    case "MSPOK":
                        mspOk = cookie.value;
                        break;
                    default:
                        // Ignore other cookies
                        break;
                }
            }
            if (typeof mspOk !== "string") {
                throw getLiveKeysErrors.MspokCookieNotFoundError.create(getOptions, response);
            }
            if (typeof mspRequ !== "string") {
                throw getLiveKeysErrors.MsprequCookieNotFoundError.create(getOptions, response);
            }
            const ppftKey = scrapLivePpftKey(response.body);
            return {
                MSPRequ: mspRequ,
                MSPOK: mspOk,
                PPFT: ppftKey,
            };
        }
        catch (_err) {
            const err = _err;
            switch (err.name) {
                case httpErrors.RequestError.name:
                case getLiveKeysErrors.MspokCookieNotFoundError.name:
                case getLiveKeysErrors.MsprequCookieNotFoundError.name:
                case getLiveKeysErrors.PpftKeyNotFoundError.name:
                    throw getLiveKeysErrors.GetLiveKeysError.create(err);
                default:
                    throw _err;
            }
        }
    });
}
exports.getLiveKeys = getLiveKeys;
/**
 * Retrieves the PPFT key from the HTML response from login.live.com to get the Live keys.
 *
 * @param html The html body to scrap
 * @returns The PPFT key
 */
function scrapLivePpftKey(html) {
    /* tslint:disable-next-line:max-line-length */
    const ppftRegExp = /<input\s+type="hidden"\s+name="PPFT"\s+id="i0327"\s+value="([*!0-9a-zA-Z]+\${1,2})"\s*\/>/;
    const regExpResult = ppftRegExp.exec(html);
    if (regExpResult === null) {
        throw getLiveKeysErrors.PpftKeyNotFoundError.create(html);
    }
    return regExpResult[1];
}
exports.scrapLivePpftKey = scrapLivePpftKey;
function getLiveToken(options) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield requestLiveToken(options);
            return scrapLiveToken(response.body);
        }
        catch (_err) {
            const err = _err;
            switch (err.name) {
                case httpErrors.RequestError.name:
                case getLiveTokenErrors.LiveTokenNotFoundError.name:
                    throw getLiveTokenErrors.GetLiveTokenError.create(err);
                case wrong_credentials_1.WrongCredentialsError.name:
                    if (typeof err.data.username !== "string") {
                        throw wrong_credentials_1.WrongCredentialsError.create(options.username);
                    }
                    else {
                        throw err;
                    }
                case wrong_credentials_limit_1.WrongCredentialsLimitError.name:
                default:
                    throw _err;
            }
        }
    });
}
exports.getLiveToken = getLiveToken;
// Get live token from live keys and credentials
function requestLiveToken(options) {
    return __awaiter(this, void 0, void 0, function* () {
        const uri = url_1.default.resolve(exports.liveLoginUri, path_1.default.posix.join("ppsecure", "post.srf"));
        const queryString = {
            wa: "wsignin1.0",
            wp: "MBI_SSL",
            // tslint:disable-next-line:max-line-length
            wreply: "https://lw.skype.com/login/oauth/proxy?client_id=578134&site_name=lw.skype.com&redirect_uri=https%3A%2F%2Fweb.skype.com%2F",
        };
        // MSPRequ should already be set
        // MSPOK should already be set
        const millisecondsSinceEpoch = Date.now(); // Milliseconds since epoch
        const ckTstCookie = new tough_cookie_1.default.Cookie({
            key: "CkTst",
            value: millisecondsSinceEpoch.toString(10),
        });
        new tough_cookie_1.default.CookieJar(options.cookies).setCookieSync(ckTstCookie, "https://login.live.com/");
        const formData = {
            login: options.username,
            passwd: options.password,
            PPFT: options.liveKeys.PPFT,
        };
        const postOptions = {
            uri,
            queryString,
            cookies: options.cookies,
            form: formData,
        };
        try {
            return options.httpIo.post(postOptions);
        }
        catch (err) {
            throw httpErrors.RequestError.create(err, postOptions);
        }
    });
}
exports.requestLiveToken = requestLiveToken;
/**
 * Scrap the result of a sendCredentials requests to retrieve the value of the `t` parameter
 * @param html
 * @returns The token provided by Live for Skype
 */
function scrapLiveToken(html) {
    // TODO(demurgos): Handle the possible failure of .load (invalid HTML)
    const $ = cheerio_1.default.load(html);
    const tokenNode = $("#t");
    const tokenValue = tokenNode.val();
    if (tokenValue === undefined || tokenValue === "") {
        if (html.indexOf("sErrTxt:'Your account or password is incorrect.") >= 0) {
            throw wrong_credentials_1.WrongCredentialsError.create();
            /* tslint:disable-next-line:max-line-length */
        }
        else if (html.indexOf("sErrTxt:\"You\\'ve tried to sign in too many times with an incorrect account or password.\"") >= 0) {
            throw wrong_credentials_limit_1.WrongCredentialsLimitError.create();
        }
        else {
            // TODO(demurgos): Check if there is a PPFT token (redirected to the getLiveKeys response)
            throw getLiveTokenErrors.LiveTokenNotFoundError.create(html);
        }
    }
    return tokenValue;
}
exports.scrapLiveToken = scrapLiveToken;
/**
 * Complete the OAuth workflow and get the Skype token
 *
 * @param options
 */
function getSkypeToken(options) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const startTime = Date.now();
            const res = yield requestSkypeToken(options);
            const scrapped = scrapSkypeTokenResponse(res.body);
            // Expires in (seconds) (default: 1 day)
            const expiresIn = typeof scrapped.expires_in === "number" ? scrapped.expires_in : 864000;
            return {
                value: scrapped.skypetoken,
                expirationDate: new Date(startTime + expiresIn * 1000),
            };
        }
        catch (_err) {
            const err = _err;
            switch (err.name) {
                case httpErrors.RequestError.name:
                case getSkypeTokenErrors.SkypeTokenNotFoundError.name:
                    throw getSkypeTokenErrors.GetSkypeTokenError.create(err);
                default:
                    throw _err;
            }
        }
    });
}
exports.getSkypeToken = getSkypeToken;
function requestSkypeToken(options) {
    return __awaiter(this, void 0, void 0, function* () {
        const uri = url_1.default.resolve(exports.skypeLoginUri, "microsoft");
        const queryString = {
            client_id: "578134",
            redirect_uri: "https://web.skype.com",
        };
        const formData = {
            t: options.liveToken,
            client_id: "578134",
            oauthPartner: "999",
            site_name: "lw.skype.com",
            redirect_uri: "https://web.skype.com",
        };
        const postOptions = {
            uri,
            queryString,
            form: formData,
        };
        try {
            return options.httpIo.post(postOptions);
        }
        catch (err) {
            throw httpErrors.RequestError.create(err, postOptions);
        }
    });
}
exports.requestSkypeToken = requestSkypeToken;
/**
 * Scrap to get the Skype OAuth token
 *
 * @param html
 * @returns {string}
 */
function scrapSkypeTokenResponse(html) {
    // TODO(demurgos): Handle .load errors (invalid HTML)
    const $ = cheerio_1.default.load(html);
    const skypeTokenNode = $("input[name=skypetoken]");
    // In seconds
    const expiresInNode = $("input[name=expires_in]");
    const skypeToken = skypeTokenNode.val();
    const expiresIn = parseInt(expiresInNode.val(), 10);
    if (typeof skypeToken !== "string") {
        getSkypeTokenErrors.SkypeTokenNotFoundError.create(html);
    }
    // if (!skypetoken || !expires_in) {
    //   const skypeErrorMessage = $(".message_error").text();
    //   const errorName = "authentication-failed";
    //   const errorMessage = "Failed to get skypetoken. Username or password is incorrect OR you've hit a CAPTCHA wall.";
    //   if (skypeErrorMessage) {
    //     const skypeError = new Incident("skype-error", skypeErrorMessage);
    //     throw new Incident(skypeError, errorName, errorMessage);
    //   } else {
    //     throw new Incident(errorName, errorMessage);
    //   }
    // }
    // return result;
    return {
        skypetoken: skypeToken,
        expires_in: expiresIn,
    };
}
exports.scrapSkypeTokenResponse = scrapSkypeTokenResponse;
//# sourceMappingURL=microsoft-account.js.map