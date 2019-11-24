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
const fs = __importStar(require("async-file"));
const incident_1 = require("incident");
const messagesUri = __importStar(require("../messages-uri"));
const utils_1 = require("../utils");
function getFilesizeInBytes(filename) {
    return __awaiter(this, void 0, void 0, function* () {
        const stats = yield fs.stat(filename);
        const fileSizeInBytes = stats["size"];
        return fileSizeInBytes;
    });
}
function sendFile(io, apiContext, img, conversationId) {
    return __awaiter(this, void 0, void 0, function* () {
        const bodyNewObject = {
            type: "sharing/file",
            permissions: { [conversationId]: ["read"] },
            filename: img.name,
        };
        const bodyNewObjectStr = JSON.stringify(bodyNewObject);
        const requestOptionsNewObject = {
            uri: messagesUri.objects("api.asm.skype.com"),
            cookies: apiContext.cookies,
            body: bodyNewObjectStr,
            headers: {
                Authorization: `skype_token ${apiContext.skypeToken.value}`,
                "Content-Type": "application/json",
                "Content-Length": bodyNewObjectStr.length.toString(10),
                "X-Client-Version": "0/0.0.0.0",
            },
        };
        const resNewObject = yield io.post(requestOptionsNewObject);
        if (resNewObject.statusCode !== 201) {
            return Promise.reject(new incident_1.Incident("send-file", "Received wrong return code"));
        }
        const objectId = JSON.parse(resNewObject.body).id;
        const file = yield fs.readFile(img.file);
        const filesize = yield getFilesizeInBytes(img.file);
        const requestOptionsPutObject = {
            uri: messagesUri.objectContent("api.asm.skype.com", objectId, "original"),
            cookies: apiContext.cookies,
            body: file,
            headers: {
                Authorization: `skype_token ${apiContext.skypeToken.value}`,
                "Content-Type": "multipart/form-data",
                "Content-Length": file.byteLength.toString(10),
                "X-Client-Version": "0/0.0.0.0",
            },
        };
        const resObject = yield io.put(requestOptionsPutObject);
        // console.log(requestOptionsPutObject);
        if (resObject.statusCode !== 201) {
            return Promise.reject(new incident_1.Incident("send-file", "Received wrong return code"));
        }
        const pictureUri = messagesUri.object("api.asm.skype.com", objectId);
        const pictureThumbnailUri = messagesUri.objectView("api.asm.skype.com", objectId, "original");
        const link = `<a href="https://login.skype.com/login/sso?go=webclient.xmm&amp;docid=${objectId}">
  https://login.skype.com/login/sso?go=webclient.xmm&amp;docid=${objectId}</a>`;
        const query = {
            clientmessageid: String(utils_1.getCurrentTime() + Math.floor(10000 * Math.random())),
            content: `<URIObject type="File.1" uri="${pictureUri}" url_thumbnail="${pictureThumbnailUri}">
        To view this file,go to:${link}
        <OriginalName v="${img.name}"/>
        <FileSize v="${filesize}"></FileSize>
      </URIObject>`,
            messagetype: "RichText/Media_GenericFile",
            contenttype: "text",
        };
        const requestOptions = {
            uri: messagesUri.messages(apiContext.registrationToken.host, messagesUri.DEFAULT_USER, conversationId),
            cookies: apiContext.cookies,
            body: JSON.stringify(query),
            headers: {
                RegistrationToken: apiContext.registrationToken.raw,
            },
        };
        const res = yield io.post(requestOptions);
        if (res.statusCode !== 201) {
            return Promise.reject(new incident_1.Incident("send-message", "Received wrong return code"));
        }
        const parsed = messagesUri.parseMessage(res.headers["location"]);
        const body = JSON.parse(res.body);
        return {
            clientMessageId: query.clientmessageid,
            arrivalTime: body.OriginalArrivalTime,
            textContent: query.content,
            MessageId: parsed.message,
        };
    });
}
exports.sendFile = sendFile;
//# sourceMappingURL=send-file.js.map