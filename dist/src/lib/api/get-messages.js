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
function getMessages(io, apiContext, conversationId) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = {
            startTime: "2",
            pageSize: "30",
            view: "supportsExtendedHistory|msnp24Equivalent|supportsMessageProperties",
        };
        const requestOptions = {
            uri: messagesUri.messages(apiContext.registrationToken.host, messagesUri.DEFAULT_USER, conversationId),
            cookies: apiContext.cookies,
            queryString: query,
            headers: {
                RegistrationToken: apiContext.registrationToken.raw,
            },
        };
        const res = yield io.get(requestOptions);
        if (res.statusCode !== 200) {
            return Promise.reject(new incident_1.Incident("net", "Unable to fetch messages"));
        }
        const body = JSON.parse(res.body);
        return body.messages;
    });
}
exports.getMessages = getMessages;
//# sourceMappingURL=get-messages.js.map