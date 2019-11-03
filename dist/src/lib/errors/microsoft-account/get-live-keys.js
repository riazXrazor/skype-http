"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const incident_1 = require("incident");
var MsprequCookieNotFoundError;
(function (MsprequCookieNotFoundError) {
    MsprequCookieNotFoundError.name = "MsprequCookieNotFound";
})(MsprequCookieNotFoundError = exports.MsprequCookieNotFoundError || (exports.MsprequCookieNotFoundError = {}));
(function (MsprequCookieNotFoundError) {
    function format({ response, request }) {
        return "Unable to find the MSPRequ cookie for https://login.live.com/."
            + " This cookie is normally set in the response headers."
            + " This error may be caused by a change in the Microsoft login workflow."
            + ` Request: ${JSON.stringify(request)}, Response: ${response}`;
    }
    MsprequCookieNotFoundError.format = format;
    function create(request, response) {
        return new incident_1.Incident(MsprequCookieNotFoundError.name, { request, response }, format);
    }
    MsprequCookieNotFoundError.create = create;
})(MsprequCookieNotFoundError = exports.MsprequCookieNotFoundError || (exports.MsprequCookieNotFoundError = {}));
var MspokCookieNotFoundError;
(function (MspokCookieNotFoundError) {
    MspokCookieNotFoundError.name = "MspokCookieNotFound";
})(MspokCookieNotFoundError = exports.MspokCookieNotFoundError || (exports.MspokCookieNotFoundError = {}));
(function (MspokCookieNotFoundError) {
    function format({ response, request }) {
        return "Unable to find the MSPOK cookie for https://login.live.com/."
            + " This cookie is normally set in the response headers."
            + " This error may be caused by a change in the Microsoft login workflow."
            + ` Request: ${JSON.stringify(request)}, Response: ${response}`;
    }
    MspokCookieNotFoundError.format = format;
    function create(request, response) {
        return new incident_1.Incident(MspokCookieNotFoundError.name, { request, response }, format);
    }
    MspokCookieNotFoundError.create = create;
})(MspokCookieNotFoundError = exports.MspokCookieNotFoundError || (exports.MspokCookieNotFoundError = {}));
var PpftKeyNotFoundError;
(function (PpftKeyNotFoundError) {
    PpftKeyNotFoundError.name = "PpftKeyNotFound";
})(PpftKeyNotFoundError = exports.PpftKeyNotFoundError || (exports.PpftKeyNotFoundError = {}));
(function (PpftKeyNotFoundError) {
    function format({ html }) {
        return "Unable to find the PPFT key for https://login.live.com/."
            + " This key is normally found in the HTML response, in a Javascript literal string containing an HTML input"
            + " with the attribute name=\"PPFT\", the key is the value of this input and is extracted with a regular"
            + " expression. This error may be caused by a change in the Microsoft login workflow."
            + ` HTML page: ${JSON.stringify(html)}`;
    }
    PpftKeyNotFoundError.format = format;
    function create(html) {
        return new incident_1.Incident(PpftKeyNotFoundError.name, { html }, format);
    }
    PpftKeyNotFoundError.create = create;
})(PpftKeyNotFoundError = exports.PpftKeyNotFoundError || (exports.PpftKeyNotFoundError = {}));
var GetLiveKeysError;
(function (GetLiveKeysError) {
    GetLiveKeysError.name = "GetLiveKeys";
})(GetLiveKeysError = exports.GetLiveKeysError || (exports.GetLiveKeysError = {}));
(function (GetLiveKeysError) {
    function format() {
        return "Unable to get the MSPRequ, MSPOK and PPFT keys from login.live.com";
    }
    GetLiveKeysError.format = format;
    function create(cause) {
        return incident_1.Incident(cause, GetLiveKeysError.name, {}, format);
    }
    GetLiveKeysError.create = create;
})(GetLiveKeysError = exports.GetLiveKeysError || (exports.GetLiveKeysError = {}));
//# sourceMappingURL=get-live-keys.js.map