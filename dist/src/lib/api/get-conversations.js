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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
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
const lodash_1 = __importDefault(require("lodash"));
const messagesUri = __importStar(require("../messages-uri"));
const formatters_1 = require("../utils/formatters");
function getConversations(io, apiContext) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = {
            startTime: "0",
            view: "msnp24Equivalent",
            targetType: "Passport|Skype|Lync|Thread",
        };
        const requestOptions = {
            uri: messagesUri.conversations(apiContext.registrationToken.host, messagesUri.DEFAULT_USER),
            cookies: apiContext.cookies,
            queryString: query,
            headers: {
                RegistrationToken: apiContext.registrationToken.raw,
            },
        };
        const res = yield io.get(requestOptions);
        if (res.statusCode !== 200) {
            return Promise.reject(new incident_1.Incident("net", "Unable to fetch conversations"));
        }
        const body = JSON.parse(res.body);
        return lodash_1.default.map(body.conversations, formatters_1.formatConversation);
    });
}
exports.getConversations = getConversations;
//# sourceMappingURL=get-conversations.js.map