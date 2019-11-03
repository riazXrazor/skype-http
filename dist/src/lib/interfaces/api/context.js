"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tough_cookie_1 = __importDefault(require("tough-cookie"));
var SkypeToken;
(function (SkypeToken) {
    /**
     * Export a SkypeToken to a JSON-safe object.
     */
    function toJson(token) {
        return {
            value: token.value,
            expirationDate: token.expirationDate.toISOString(),
        };
    }
    SkypeToken.toJson = toJson;
    /**
     * Import a SkypeToken from a JSON-safe object.
     */
    function fromJson(token) {
        return {
            value: token.value,
            expirationDate: new Date(token.expirationDate),
        };
    }
    SkypeToken.fromJson = fromJson;
})(SkypeToken = exports.SkypeToken || (exports.SkypeToken = {}));
var RegistrationToken;
(function (RegistrationToken) {
    /**
     * Export a RegistrationToken to a JSON-safe object.
     */
    function toJson(token) {
        return {
            value: token.value,
            expirationDate: token.expirationDate.toISOString(),
            endpointId: token.endpointId,
            host: token.host,
            raw: token.raw,
        };
    }
    RegistrationToken.toJson = toJson;
    /**
     * Import a RegistrationToken from a JSON-safe object.
     */
    function fromJson(token) {
        return {
            value: token.value,
            expirationDate: new Date(token.expirationDate),
            endpointId: token.endpointId,
            host: token.host,
            raw: token.raw,
        };
    }
    RegistrationToken.fromJson = fromJson;
})(RegistrationToken = exports.RegistrationToken || (exports.RegistrationToken = {}));
var Context;
(function (Context) {
    function toJson(context) {
        return {
            username: context.username,
            cookies: new tough_cookie_1.default.CookieJar(context.cookies).serializeSync(),
            skypeToken: SkypeToken.toJson(context.skypeToken),
            registrationToken: RegistrationToken.toJson(context.registrationToken),
        };
    }
    Context.toJson = toJson;
    function fromJson(context) {
        const cookies = new tough_cookie_1.default.MemoryCookieStore();
        tough_cookie_1.default.CookieJar.deserializeSync(context.cookies, cookies);
        return {
            username: context.username,
            cookies,
            skypeToken: SkypeToken.fromJson(context.skypeToken),
            registrationToken: RegistrationToken.fromJson(context.registrationToken),
        };
    }
    Context.fromJson = fromJson;
})(Context = exports.Context || (exports.Context = {}));
//# sourceMappingURL=context.js.map