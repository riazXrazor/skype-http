"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const incident_1 = require("incident");
var WrongCredentialsLimitError;
(function (WrongCredentialsLimitError) {
    WrongCredentialsLimitError.name = "WrongCredentialsLimit";
})(WrongCredentialsLimitError = exports.WrongCredentialsLimitError || (exports.WrongCredentialsLimitError = {}));
(function (WrongCredentialsLimitError) {
    function format() {
        return "You've tried to sign in too many times with an incorrect account or password";
    }
    WrongCredentialsLimitError.format = format;
    function create(username) {
        return incident_1.Incident(WrongCredentialsLimitError.name, { username }, format);
    }
    WrongCredentialsLimitError.create = create;
})(WrongCredentialsLimitError = exports.WrongCredentialsLimitError || (exports.WrongCredentialsLimitError = {}));
//# sourceMappingURL=wrong-credentials-limit.js.map