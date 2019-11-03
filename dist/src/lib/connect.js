"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const incident_1 = require("incident");
const api = __importStar(require("./api"));
const context_1 = require("./interfaces/api/context");
const login_1 = require("./login");
const request_io_1 = require("./request-io");
/**
 * Authenticate the user and create a new API.
 *
 * @param options
 * @returns The Skype API for the provided user
 * @throws [[LoginError]]
 */
function connect(options) {
    return __awaiter(this, void 0, void 0, function* () {
        let apiContext;
        if (options.state !== undefined) {
            apiContext = context_1.Context.fromJson(options.state);
        }
        else if (options.credentials !== undefined) {
            apiContext = yield login_1.login({
                io: request_io_1.requestIo,
                credentials: options.credentials,
                verbose: options.verbose,
            });
            if (options.verbose) {
                console.log("Obtained context trough authentication:");
                console.log({
                    username: apiContext.username,
                    skypeToken: apiContext.skypeToken,
                    registrationToken: apiContext.registrationToken,
                });
            }
        }
        else {
            return Promise.reject(new incident_1.Incident("todo", "Connect must define `credentials`"));
        }
        return new api.Api(apiContext, request_io_1.requestIo);
    });
}
exports.connect = connect;
//# sourceMappingURL=connect.js.map