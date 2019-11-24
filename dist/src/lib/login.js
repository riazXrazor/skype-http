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
const incident_1 = require("incident");
const tough_cookie_1 = __importDefault(require("tough-cookie"));
const get_self_profile_1 = require("./api/get-self-profile");
const Consts = __importStar(require("./consts"));
const register_endpoint_1 = require("./helpers/register-endpoint");
const messagesUri = __importStar(require("./messages-uri"));
const microsoftAccount = __importStar(require("./providers/microsoft-account"));
/**
 * Builds an Api context trough a new authentication.
 * This involves the requests:
 * GET <loginUrl> to scrap the LoginKeys (pie & etm)
 * POST <loginUrl> to get the SkypeToken from the credentials and LoginKeys
 * GET <selfProfileUrl> to get the userId
 * POST <registrationUrl> to get RegistrationToken from the SkypeToken
 *   Eventually, follow a redirection to use the assigned host
 * POST <subscription> to gain access to resources with the RegistrationToken
 *
 * @param options
 * @returns A new API context with the tokens for the provided user
 */
function login(options) {
    return __awaiter(this, void 0, void 0, function* () {
        const cookies = new tough_cookie_1.default.MemoryCookieStore();
        const ioOptions = { io: options.io, cookies };
        const skypeToken = yield microsoftAccount.login({
            credentials: {
                login: options.credentials.username,
                password: options.credentials.password
            },
            httpIo: options.io,
            cookies
        });
        if (options.verbose) {
            console.log("Acquired SkypeToken");
        }
        const profile = yield get_self_profile_1.getSelfProfile(options.io, cookies, skypeToken);
        const username = profile.username;
        if (options.verbose) {
            console.log("Acquired username");
        }
        const registrationToken = yield register_endpoint_1.registerEndpoint(ioOptions.io, ioOptions.cookies, skypeToken, Consts.SKYPEWEB_DEFAULT_MESSAGES_HOST);
        if (options.verbose) {
            console.log("Acquired RegistrationToken");
        }
        yield subscribeToResources(ioOptions, registrationToken);
        if (options.verbose) {
            console.log("Subscribed to resources");
        }
        yield createPresenceDocs(ioOptions, registrationToken);
        if (options.verbose) {
            console.log("Created presence docs");
        }
        return {
            username,
            skypeToken,
            cookies,
            registrationToken
        };
    });
}
exports.login = login;
function subscribeToResources(ioOptions, registrationToken) {
    return __awaiter(this, void 0, void 0, function* () {
        // TODO(demurgos): typedef
        // tslint:disable-next-line:typedef
        const requestDocument = {
            interestedResources: [
                "/v1/threads/ALL",
                "/v1/users/ME/contacts/ALL",
                "/v1/users/ME/conversations/ALL/messages",
                "/v1/users/ME/conversations/ALL/properties"
            ],
            template: "raw",
            channelType: "httpLongPoll" // TODO: use websockets ?
        };
        const requestOptions = {
            uri: messagesUri.subscriptions(registrationToken.host),
            cookies: ioOptions.cookies,
            body: JSON.stringify(requestDocument),
            headers: {
                RegistrationToken: registrationToken.raw
            }
        };
        const res = yield ioOptions.io.post(requestOptions);
        if (res.statusCode !== 201) {
            return Promise.reject(new incident_1.Incident("net", `Unable to subscribe to resources: statusCode: ${res.statusCode} body: ${res.body}`));
        }
        // Example response:
        // {
        //   "statusCode": 201,
        //   "body": "{}",
        //   "headers": {
        //     "cache-control": "no-store, must-revalidate, no-cache",
        //       "pragma": "no-cache",
        //       "content-length": "2",
        //       "content-type": "application/json; charset=utf-8",
        //       "location": "https://db5-client-s.gateway.messenger.live.com/v1/users/ME/endpoints/SELF/subscriptions/0",
        //       "x-content-type-options": "nosniff",
        //       "contextid": "tcid=3434983151221922702,server=DB5SCH101121535",
        //       "date": "Sat, 14 May 2016 16:41:17 GMT",
        //       "connection": "close"
        //   }
        // }
    });
}
function createPresenceDocs(ioOptions, registrationToken) {
    return __awaiter(this, void 0, void 0, function* () {
        // this is the exact json that is needed to register endpoint for setting of status.
        // demurgos: If I remember well enough, it's order dependant.
        // TODO: typedef
        // tslint:disable-next-line:typedef
        const requestBody = {
            id: "endpointMessagingService",
            type: "EndpointPresenceDoc",
            selfLink: "uri",
            privateInfo: {
                epname: "skype" // Name of the endpoint (normally the name of the host)
            },
            publicInfo: {
                capabilities: "video|audio",
                type: 1,
                skypeNameVersion: Consts.SKYPEWEB_CLIENTINFO_NAME,
                nodeInfo: "xx",
                version: `${Consts.SKYPEWEB_CLIENTINFO_VERSION}//${Consts.SKYPEWEB_CLIENTINFO_NAME}`
            }
        };
        const uri = messagesUri.endpointMessagingService(registrationToken.host, messagesUri.DEFAULT_USER, registrationToken.endpointId);
        const requestOptions = {
            uri,
            cookies: ioOptions.cookies,
            body: JSON.stringify(requestBody),
            headers: {
                RegistrationToken: registrationToken.raw
            }
        };
        const res = yield ioOptions.io.put(requestOptions);
        if (res.statusCode !== 200) {
            return Promise.reject(new incident_1.Incident("net", "Unable to create presence endpoint"));
        }
    });
}
//# sourceMappingURL=login.js.map