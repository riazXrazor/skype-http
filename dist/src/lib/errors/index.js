"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("./http");
exports.RequestError = http_1.RequestError;
exports.UnexpectedHttpStatusError = http_1.UnexpectedHttpStatusError;
var wrong_credentials_1 = require("./wrong-credentials");
exports.WrongCredentialsError = wrong_credentials_1.WrongCredentialsError;
var wrong_credentials_limit_1 = require("./wrong-credentials-limit");
exports.WrongCredentialsLimitError = wrong_credentials_limit_1.WrongCredentialsLimitError;
const endpointRegistrationError = __importStar(require("./endpoint-registration"));
exports.endpointRegistrationError = endpointRegistrationError;
const LoginRateLimitExceeded = __importStar(require("./login-rate-limit-exceeded"));
exports.LoginRateLimitExceeded = LoginRateLimitExceeded;
const microsoftAccount = __importStar(require("./microsoft-account"));
exports.microsoftAccount = microsoftAccount;
const RedirectionLimit = __importStar(require("./redirection-limit"));
exports.RedirectionLimit = RedirectionLimit;
//# sourceMappingURL=index.js.map