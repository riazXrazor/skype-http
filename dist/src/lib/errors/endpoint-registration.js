"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const incident_1 = require("incident");
exports.NAME = "EndpointRegistration";
class EndpointRegistrationError extends incident_1.Incident {
    constructor(cause, tries) {
        super(cause, EndpointRegistrationError.NAME, { tries });
    }
}
exports.EndpointRegistrationError = EndpointRegistrationError;
EndpointRegistrationError.NAME = exports.NAME;
//# sourceMappingURL=endpoint-registration.js.map