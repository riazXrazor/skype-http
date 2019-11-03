"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const incident_1 = require("incident");
// TODO(demurgos): Differenciate between workflow errors (network error, unexpected responses) and expected errors
var MicrosoftAccountLoginError;
(function (MicrosoftAccountLoginError) {
    MicrosoftAccountLoginError.name = "MicrosoftAccountLogin";
})(MicrosoftAccountLoginError = exports.MicrosoftAccountLoginError || (exports.MicrosoftAccountLoginError = {}));
(function (MicrosoftAccountLoginError) {
    function format() {
        return "Unable to login with MicrosoftAccount.";
    }
    MicrosoftAccountLoginError.format = format;
    function create(cause) {
        return incident_1.Incident(cause, MicrosoftAccountLoginError.name, {}, format);
    }
    MicrosoftAccountLoginError.create = create;
})(MicrosoftAccountLoginError = exports.MicrosoftAccountLoginError || (exports.MicrosoftAccountLoginError = {}));
//# sourceMappingURL=login.js.map