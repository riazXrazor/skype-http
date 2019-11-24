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
const camelcase_keys_1 = __importDefault(require("camelcase-keys"));
const incident_1 = require("incident");
const apiUri = __importStar(require("../api-uri"));
const http_1 = require("../errors/http");
function getSelfProfile(httpIo, cookies, skypeToken) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = apiUri.userProfile(apiUri.DEFAULT_USER);
        const request = {
            uri: url,
            cookies,
            headers: {
                "X-Skypetoken": skypeToken.value,
            },
        };
        const response = yield httpIo.get(request);
        if (response.statusCode !== 200) {
            http_1.UnexpectedHttpStatusError.create(response, new Set([200]), request);
        }
        let parsed;
        try {
            parsed = JSON.parse(response.body);
            parsed = camelcase_keys_1.default(parsed, { deep: true });
        }
        catch (err) {
            throw new incident_1.Incident(err, "UnexpectedResponseBody", { body: response.body });
        }
        let result;
        try {
            result = parsed;
        }
        catch (err) {
            throw new incident_1.Incident(err, "UnexpectedResult", { body: parsed });
        }
        return result;
    });
}
exports.getSelfProfile = getSelfProfile;
//# sourceMappingURL=get-self-profile.js.map