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
const messagesUri = __importStar(require("../messages-uri"));
const utils_1 = require("../utils");
function createConversation(io, apiContext, allUsers) {
    return __awaiter(this, void 0, void 0, function* () {
        // Each member object consists of an ``id`` (user thread identifier), and role (either ``Admin`` or ``User``).
        const members = utils_1.getMembers(allUsers);
        const requestBody = {
            members,
        };
        const uri = messagesUri.threads(apiContext.registrationToken.host);
        const requestOptions = {
            uri,
            cookies: apiContext.cookies,
            body: JSON.stringify(requestBody),
            headers: {
                RegistrationToken: apiContext.registrationToken.raw,
                Location: "/",
            },
        };
        const res = yield io.post(requestOptions);
        if (res.statusCode !== 201) {
            throw new incident_1.Incident("create-conversation", "Received wrong return code");
        }
        const location = res.headers.location;
        if (location === undefined) {
            throw new incident_1.Incident("create-conversation", "Missing `Location` response header");
        }
        // TODO: Parse URL properly / more reliable checks
        const id = location.split("/").pop();
        if (id === undefined) {
            throw new incident_1.Incident("create-conversation", "Unable to read conversation ID");
        }
        // conversation ID
        return id;
    });
}
exports.createConversation = createConversation;
//# sourceMappingURL=create-conversation.js.map