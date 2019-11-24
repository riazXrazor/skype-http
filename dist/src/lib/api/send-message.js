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
function sendMessage(io, apiContext, message, conversationId) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = {
            clientmessageid: String(utils_1.getCurrentTime() + Math.floor(10000 * Math.random())),
            content: String(message.textContent),
            messagetype: "RichText",
            contenttype: "text"
        };
        const requestOptions = {
            uri: messagesUri.messages(apiContext.registrationToken.host, messagesUri.DEFAULT_USER, conversationId),
            cookies: apiContext.cookies,
            body: JSON.stringify(query),
            headers: {
                RegistrationToken: apiContext.registrationToken.raw
            }
        };
        const res = yield io.post(requestOptions);
        console.log(JSON.stringify(res, null, 2));
        if (res.statusCode !== 201) {
            return Promise.reject(new incident_1.Incident("send-message", "Received wrong return code"));
        }
        const parsed = messagesUri.parseMessage(res.headers["location"]);
        const body = JSON.parse(res.body);
        return {
            clientMessageId: query.clientmessageid,
            arrivalTime: body.OriginalArrivalTime,
            textContent: query.content,
            MessageId: parsed.message
        };
    });
}
exports.sendMessage = sendMessage;
//# sourceMappingURL=send-message.js.map