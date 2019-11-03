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
const apiUri = __importStar(require("../api-uri"));
const formatters_1 = require("../utils/formatters");
exports.VIRTUAL_CONTACTS = new Set(["concierge", "echo123"]);
function getContact(io, apiContext, contactId) {
    return __awaiter(this, void 0, void 0, function* () {
        if (exports.VIRTUAL_CONTACTS.has(contactId)) {
            // tslint:disable-next-line:max-line-length
            throw new Error(`${JSON.stringify(contactId)} is not a real contact, you cannot get data for ${JSON.stringify(contactId)}`);
        }
        const requestOptions = {
            uri: apiUri.userProfiles(),
            cookies: apiContext.cookies,
            form: { usernames: [contactId] },
            headers: {
                "X-Skypetoken": apiContext.skypeToken.value,
            },
        };
        const res = yield io.post(requestOptions);
        if (res.statusCode !== 200) {
            return Promise.reject(new incident_1.Incident("net", "Unable to fetch contact"));
        }
        const body = formatters_1.formatSearchContact(JSON.parse(res.body)[0]);
        return body;
    });
}
exports.getContact = getContact;
//# sourceMappingURL=get-contact.js.map