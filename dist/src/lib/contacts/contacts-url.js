"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const url_1 = __importDefault(require("url"));
const CONTACTS_HOST = "contacts.skype.com";
function formatInvites(userId) {
    return url_1.default.format({
        protocol: "https",
        host: CONTACTS_HOST,
        pathname: path_1.default.posix.join("contacts", "v2", "users", userId, "invites"),
    });
}
exports.formatInvites = formatInvites;
function formatUser(userId) {
    return url_1.default.format({
        protocol: "https",
        host: CONTACTS_HOST,
        pathname: path_1.default.posix.join("contacts", "v2", "users", userId),
    });
}
exports.formatUser = formatUser;
//# sourceMappingURL=contacts-url.js.map