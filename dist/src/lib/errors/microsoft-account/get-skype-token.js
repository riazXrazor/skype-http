"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const incident_1 = require("incident");
var SkypeTokenNotFoundError;
(function (SkypeTokenNotFoundError) {
    SkypeTokenNotFoundError.name = "SkypeTokenNotFound";
})(SkypeTokenNotFoundError = exports.SkypeTokenNotFoundError || (exports.SkypeTokenNotFoundError = {}));
(function (SkypeTokenNotFoundError) {
    function format({ html }) {
        return "Unable to find the OAuth Skype token. This may be caused by wrong credentials or a change in"
            + " the Microsoft login workflow. You may also have hit a CAPTCHA wall."
            + " This token is normally found in the HTML response as the value of the element `input[name=skypetoken]`."
            + ` HTML page: ${JSON.stringify(html)}`;
    }
    SkypeTokenNotFoundError.format = format;
    function create(html) {
        return new incident_1.Incident(SkypeTokenNotFoundError.name, { html }, format);
    }
    SkypeTokenNotFoundError.create = create;
})(SkypeTokenNotFoundError = exports.SkypeTokenNotFoundError || (exports.SkypeTokenNotFoundError = {}));
var GetSkypeTokenError;
(function (GetSkypeTokenError) {
    GetSkypeTokenError.name = "GetSkypeToken";
})(GetSkypeTokenError = exports.GetSkypeTokenError || (exports.GetSkypeTokenError = {}));
(function (GetSkypeTokenError) {
    function format() {
        return "Unable to get the OAuth Skype token.";
    }
    GetSkypeTokenError.format = format;
    function create(cause) {
        return incident_1.Incident(cause, GetSkypeTokenError.name, {}, format);
    }
    GetSkypeTokenError.create = create;
})(GetSkypeTokenError = exports.GetSkypeTokenError || (exports.GetSkypeTokenError = {}));
//# sourceMappingURL=get-skype-token.js.map