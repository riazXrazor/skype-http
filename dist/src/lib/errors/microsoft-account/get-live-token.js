"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const incident_1 = require("incident");
var LiveTokenNotFoundError;
(function (LiveTokenNotFoundError) {
    LiveTokenNotFoundError.name = "LiveTokenNotFound";
})(LiveTokenNotFoundError = exports.LiveTokenNotFoundError || (exports.LiveTokenNotFoundError = {}));
(function (LiveTokenNotFoundError) {
    function format({ html }) {
        return "Unable to find the Live token."
            + " This token is normally found in the HTML response as the value of the element with the id \"t\"."
            + " This error may be caused by a change in the Microsoft login workflow."
            + ` HTML page: ${JSON.stringify(html)}`;
    }
    LiveTokenNotFoundError.format = format;
    function create(html) {
        return new incident_1.Incident(LiveTokenNotFoundError.name, { html }, format);
    }
    LiveTokenNotFoundError.create = create;
})(LiveTokenNotFoundError = exports.LiveTokenNotFoundError || (exports.LiveTokenNotFoundError = {}));
var GetLiveTokenError;
(function (GetLiveTokenError) {
    GetLiveTokenError.name = "GetLiveToken";
})(GetLiveTokenError = exports.GetLiveTokenError || (exports.GetLiveTokenError = {}));
(function (GetLiveTokenError) {
    function format() {
        return "Unable to get the Live token for Skype";
    }
    GetLiveTokenError.format = format;
    function create(cause) {
        return incident_1.Incident(cause, GetLiveTokenError.name, {}, format);
    }
    GetLiveTokenError.create = create;
})(GetLiveTokenError = exports.GetLiveTokenError || (exports.GetLiveTokenError = {}));
//# sourceMappingURL=get-live-token.js.map