"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const incident_1 = require("incident");
var WrongCredentialsError;
(function (WrongCredentialsError) {
    WrongCredentialsError.name = "WrongCredentials";
})(WrongCredentialsError = exports.WrongCredentialsError || (exports.WrongCredentialsError = {}));
(function (WrongCredentialsError) {
    function format({ username }) {
        if (typeof username === "string") {
            return `Wrong credentials for the user "${username}"`;
        }
        else {
            return "Wrong credentials";
        }
    }
    WrongCredentialsError.format = format;
    function create(username) {
        return incident_1.Incident(WrongCredentialsError.name, { username }, format);
    }
    WrongCredentialsError.create = create;
})(WrongCredentialsError = exports.WrongCredentialsError || (exports.WrongCredentialsError = {}));
//# sourceMappingURL=wrong-credentials.js.map