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
Object.defineProperty(exports, "__esModule", { value: true });
const incident_1 = require("incident");
function getJoinUrl(io, apiContext, conversationId) {
    return __awaiter(this, void 0, void 0, function* () {
        const requestBody = {
            baseDomain: "https://join.skype.com/launch/",
            threadId: conversationId,
        };
        const uri = "https://api.scheduler.skype.com/threads";
        const requestOptions = {
            uri,
            cookies: apiContext.cookies,
            body: JSON.stringify(requestBody),
            headers: {
                "X-Skypetoken": apiContext.skypeToken.value,
                "Content-Type": "application/json",
            },
        };
        const res = yield io.post(requestOptions);
        if (res.statusCode !== 200) {
            return Promise.reject(new incident_1.Incident("get-join-url", "Received wrong return code"));
        }
        const body = JSON.parse(res.body);
        return body.JoinUrl;
    });
}
exports.getJoinUrl = getJoinUrl;
//# sourceMappingURL=get-join-url.js.map