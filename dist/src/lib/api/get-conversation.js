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
const formatters_1 = require("../utils/formatters");
function getConversation(io, apiContext, conversationId) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = {
            startTime: "0",
            view: "msnp24Equivalent",
            targetType: "Passport|Skype|Lync|Thread",
        };
        let uri;
        if (conversationId.indexOf("19:") === 0) { // group discussion
            uri = messagesUri.thread(apiContext.registrationToken.host, conversationId);
        }
        else { // 8: private conversation
            uri = messagesUri.conversation(apiContext.registrationToken.host, messagesUri.DEFAULT_USER, conversationId);
        }
        const requestOptions = {
            uri,
            cookies: apiContext.cookies,
            queryString: query,
            headers: {
                RegistrationToken: apiContext.registrationToken.raw,
            },
        };
        const res = yield io.get(requestOptions);
        if (res.statusCode !== 200) {
            return Promise.reject(new incident_1.Incident("net", "Unable to fetch conversation"));
        }
        const body = JSON.parse(res.body);
        if (body.type === "Thread") {
            return formatters_1.formatThread(body);
        }
        else if (body.type === "Conversation") {
            return formatters_1.formatConversation(body);
        }
        else {
            return Promise.reject(new incident_1.Incident("unknonwn-type", "Unknown type for conversation..."));
        }
    });
}
exports.getConversation = getConversation;
//# sourceMappingURL=get-conversation.js.map