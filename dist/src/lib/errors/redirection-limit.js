"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const incident_1 = require("incident");
exports.name = "RedirectionLimit";
function create(limit) {
    return incident_1.Incident(exports.name, { limit });
}
exports.create = create;
//# sourceMappingURL=redirection-limit.js.map