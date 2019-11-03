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
function setConversationTopic(io, apiContext, conversationId, topic) {
    return __awaiter(this, void 0, void 0, function* () {
        const requestBody = {
            topic,
        };
        const uri = messagesUri.properties(apiContext.registrationToken.host, conversationId);
        const requestOptions = {
            uri,
            cookies: apiContext.cookies,
            body: JSON.stringify(requestBody),
            queryString: { name: "topic" },
            headers: {
                "RegistrationToken": apiContext.registrationToken.raw,
                "Content-type": "application/json",
            },
        };
        const res = yield io.put(requestOptions);
        if (res.statusCode !== 200) {
            return Promise.reject(new incident_1.Incident("set-conversation-topic", "Received wrong return code"));
        }
    });
}
exports.setConversationTopic = setConversationTopic;
//# sourceMappingURL=set-conversation-topic.js.map