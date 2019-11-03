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
const url_1 = __importDefault(require("url"));
const Consts = __importStar(require("../consts"));
const endpoint_registration_1 = require("../errors/endpoint-registration");
const http_1 = require("../errors/http");
const index_1 = require("../errors/index");
const messagesUri = __importStar(require("../messages-uri"));
const utils = __importStar(require("../utils"));
const hmac_sha256_1 = require("../utils/hmac-sha256");
function getLockAndKeyResponse(time) {
    const inputBuffer = Buffer.from(String(time), "utf8");
    const appIdBuffer = Buffer.from(Consts.SKYPEWEB_LOCKANDKEY_APPID, "utf8");
    const secretBuffer = Buffer.from(Consts.SKYPEWEB_LOCKANDKEY_SECRET, "utf8");
    return hmac_sha256_1.hmacSha256(inputBuffer, appIdBuffer, secretBuffer);
}
/**
 * Value used for the `ClientInfo` header of the request for the registration token.
 */
const CLIENT_INFO_HEADER = utils.stringifyHeaderParams({
    os: "Windows",
    osVer: "10",
    proc: "Win64",
    lcid: "en-us",
    deviceType: "1",
    country: "n/a",
    clientName: Consts.SKYPEWEB_CLIENTINFO_NAME,
    clientVer: Consts.SKYPEWEB_CLIENTINFO_VERSION,
});
/**
 * Get the value for the `LockAndKey` header of the request for the registration token.
 *
 * @param time Seconds since UNIX epoch
 */
function getLockAndKeyHeader(time) {
    const lockAndKeyResponse = getLockAndKeyResponse(time);
    return utils.stringifyHeaderParams({
        appId: Consts.SKYPEWEB_LOCKANDKEY_APPID,
        time: String(time),
        lockAndKeyResponse,
    });
}
/**
 * Get the registration token used to subscribe to resources.
 *
 * @param io Cookies and HTTP library to use.
 * @param cookies Cookie jar to use.
 * @param skypeToken The Skype to use for authentication.
 * @param messagesHostname Hostname of the messages server.
 * @param retries Number of request retries before emitting an error. Example: if `retries` is `1`, this function
 *                will send 1 or 2 requests.
 * @return Registration token
 * @throws [[EndpointRegistrationError]]
 */
function registerEndpoint(io, cookies, skypeToken, messagesHostname, retries = 2) {
    return __awaiter(this, void 0, void 0, function* () {
        // TODO: Use this array to report all the requests and responses in case of failure
        const tries = [];
        // Use non-strict equality to try at least once. `tryCount` counts the number of failures.
        for (let tryCount = 0; tryCount <= retries; tryCount++) {
            const req = {
                uri: messagesUri.endpoints(messagesHostname),
                headers: {
                    LockAndKey: getLockAndKeyHeader(utils.getCurrentTime()),
                    // TODO(demurgos, 2017-11-12): Remove the `ClientHeader` header, SkPy does not send it.
                    ClientInfo: CLIENT_INFO_HEADER,
                    Authentication: utils.stringifyHeaderParams({ skypetoken: skypeToken.value }),
                    // See: https://github.com/OllieTerrance/SkPy/issues/54#issuecomment-295746871
                    BehaviorOverride: "redirectAs404",
                },
                cookies,
                // See: https://github.com/OllieTerrance/SkPy/blob/7b6be6e41238058b9ab644d908621456764fb6d6/skpy/conn.py#L717
                body: JSON.stringify({ endpointFeatures: "Agent" }),
            };
            const res = yield io.post(req);
            tries.push({ req, res });
            if (res.statusCode === 429) {
                // Expected res.body: `'{"errorCode":803,"message":"Login Rate limit exceeded"}'`
                throw new endpoint_registration_1.EndpointRegistrationError(index_1.LoginRateLimitExceeded.create(req, res), tries);
            }
            // TODO: Check eventual changes in the API. I'm not sure if 301 is still used
            // 404 was seen the 2017-01-14, with the following body:
            // '{"errorCode":752,"message":"User is in a different cloud. See \'Location\' header for users current cloud."}'
            const expectedStatusCode = new Set([201, 301, 404]);
            if (!expectedStatusCode.has(res.statusCode)) {
                throw new endpoint_registration_1.EndpointRegistrationError(http_1.UnexpectedHttpStatusError.create(res, expectedStatusCode, req), tries);
            }
            const locationHeader = res.headers["location"];
            if (locationHeader === undefined) {
                throw new endpoint_registration_1.EndpointRegistrationError(http_1.MissingHeaderError.create(res, "Location", req), tries);
            }
            // TODO: parse in messages-uri.ts
            const location = url_1.default.parse(locationHeader);
            if (location.host === undefined) {
                throw new incident_1.Incident("ParseError", { res }, "Expected `Location` header to have host");
            }
            // Handle redirections, up to `retry` times
            // Redirections happen mostly when 301, but sometimes when 201
            // TODO: It may have changed to mostly 404.
            if (location.host !== messagesHostname) {
                messagesHostname = location.host;
                continue;
            }
            // registrationTokenHeader is like "registrationToken=someString; expires=someNumber; endpointId={someString}"
            const registrationTokenHeader = res.headers["set-registrationtoken"];
            if (registrationTokenHeader === undefined) {
                throw new endpoint_registration_1.EndpointRegistrationError(http_1.MissingHeaderError.create(res, "Set-Registrationtoken", req), tries);
            }
            return readSetRegistrationTokenHeader(messagesHostname, registrationTokenHeader);
        }
        throw new endpoint_registration_1.EndpointRegistrationError(index_1.RedirectionLimit.create(retries), tries);
    });
}
exports.registerEndpoint = registerEndpoint;
/**
 * Parse the `Set-Registrationtoken` header of an endpoint registration response.
 *
 * This header has the following shape: "registrationToken=someString; expires=someNumber; endpointId={someString}"
 *
 * @param hostname Name of the hostname for this registration token.
 * @param header String value of the `Set-Registration` header.
 * @return Parsed registration token
 */
function readSetRegistrationTokenHeader(hostname, header) {
    const parsedHeader = utils.parseHeaderParams(header);
    const expiresString = parsedHeader.get("expires");
    const registrationTokenValue = parsedHeader.get("registrationToken");
    const endpointId = parsedHeader.get("endpointId");
    if (registrationTokenValue === undefined || expiresString === undefined || endpointId === undefined) {
        throw new incident_1.Incident("InvalidSetRegistrationTokenHeader", { header, parsed: parsedHeader });
    }
    // Timestamp in seconds since UNIX epoch
    const expires = parseInt(expiresString, 10);
    return {
        value: registrationTokenValue,
        expirationDate: new Date(1000 * expires),
        endpointId,
        raw: header,
        host: hostname,
    };
}
//# sourceMappingURL=register-endpoint.js.map