"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
// github:demurgos/skype-web-reversed -> utils/people/userDataProcessor.js
function sanitizeXml(xmlString) {
    return lodash_1.default.isString(xmlString) ? lodash_1.default.escape(xmlString) : "";
}
exports.sanitizeXml = sanitizeXml;
// github:demurgos/skype-web-reversed -> utils/people/userDataProcessor.js
function sanitize(str) {
    return String(str); // TODO!
    // if (_.isString(str)) {
    //   var t = str,
    //     u = i.build(r);
    //   if (str.match(o) === null) {
    //     var a = s.escapeIncomingHTML(str);
    //     t = u.encode(a, !1);
    //   }
    //   return s.escapeIncomingHTML(u.decode(t));
    // }
    // return "";
}
exports.sanitize = sanitize;
//# sourceMappingURL=user-data-processor.js.map