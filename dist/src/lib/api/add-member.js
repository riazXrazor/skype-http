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
function addMemberToConversation(io, apiContext, memberId, converstionId, role = "User") {
    return __awaiter(this, void 0, void 0, function* () {
        // `https://{host}}/v1/threads/${converstionId}/members/${memberId}`,
        const uri = messagesUri.member(apiContext.registrationToken.host, converstionId, memberId);
        const requestBody = { role };
        const requestOptions = {
            uri,
            cookies: apiContext.cookies,
            body: JSON.stringify(requestBody),
            headers: {
                "RegistrationToken": apiContext.registrationToken.raw,
                "Content-type": "application/json",
            },
        };
        const res = yield io.put(requestOptions);
        if (res.statusCode !== 200) {
            return Promise.reject(new incident_1.Incident("add-member", "Received wrong return code"));
        }
    });
}
exports.addMemberToConversation = addMemberToConversation;
//# sourceMappingURL=add-member.js.map