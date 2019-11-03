"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const incident_1 = require("incident");
exports.name = "LoginRateLimitExceeded";
function create(req, res) {
    return incident_1.Incident(exports.name, { req, res });
}
exports.create = create;
//# sourceMappingURL=login-rate-limit-exceeded.js.map