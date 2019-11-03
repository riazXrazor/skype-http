"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const url_1 = __importDefault(require("url"));
const consts_1 = require("./consts");
exports.DEFAULT_USER = "self";
function joinPath(parts) {
    return path_1.default.posix.join.apply(null, parts);
}
// The following functions build an array of parts to build the path
// /users
function buildUsers() {
    return ["users"];
}
function buildBatch() {
    return buildUsers().concat("batch");
}
// /users/:user
function buildUser(username) {
    return buildUsers().concat(username);
}
// /users/:user/contacts
function buildContacts(username) {
    return buildUser(username).concat("contacts");
}
// /users/:user/contacts/auth-request/:contact
function buildAuthRequest(username, contact) {
    return buildContacts(username).concat("auth-request", contact);
}
// /users/:user/contacts/auth-request/:contact/accept
function buildAuthRequestAccept(username, contact) {
    return buildAuthRequest(username, contact).concat("accept");
}
// /users/:user/contacts/auth-request/:contact/decline
function buildAuthRequestDecline(username, contact) {
    return buildAuthRequest(username, contact).concat("decline");
}
// /users/:user/displayname
function buildDisplayName(username) {
    return buildUser(username).concat("displayname");
}
// /users/:user/profile
function buildProfile(username) {
    return buildUser(username).concat("profile");
}
// agentProvisioningService: { host: "https://api.aps.skype.com/v1/" },
// stratusService: {
//   avatarUrl: "users/${contactId}/profile/avatar?cacheHeaders=1",
//     avatarUpdateUrl: "users/${contactId}/profile/avatar",
//     blockContactEndpoint: "users/self/contacts/${contactId}/block",
//     contactRequestEndpoint: "users/self/contacts/auth-request",
//     contactRequestTimeInterval: 60000,
//     contactsEndpoint: "users/self/authorized-contacts",
//     directorySearchEndpointSkypeOnly: "search/users/any?keyWord=${keyword}&contactTypes[]=skype",
//     directorySearchEndpoint: "search/users/any?keyWord=${keyword}",
//     directorySearchByIdEndpoint: "search/users?skypename=${skypeName}",
//     firstContactRequestDelay: 10000,
//     host: "https://api.skype.com/",
//     myContactsEndpoint: "users/self/contacts?hideDetails=true",
//     profileEndpoint: "users/self/profile",
//     profilesEndpoint: "users/self/contacts/profiles",
//     batchProfilesEndpoint: "users/batch/profiles",
//     userInfoEndpoint: "users/self",
//     unblockContactEndpoint: "users/self/contacts/${contactId}/unblock",
//     deleteContactEndpoint: "users/self/contacts/${contactId}",
//     retry: n
// },
// /users/:user/profile/avatar?cacheHeaders=1
function buildAvatar(username) {
    return buildProfile(username).concat("avatar?cacheHeaders=1");
}
// /users/:user/profile/avatar
function buildUpdatedAvatar(username) {
    return buildProfile(username).concat("avatar");
}
function buildProfiles() {
    return buildBatch().concat("profiles");
}
function getOrigin() {
    return "https://" + consts_1.SKYPEWEB_API_SKYPE_HOST;
}
function get(p) {
    return url_1.default.resolve(getOrigin(), p);
}
function displayName(username) {
    return get(joinPath(buildDisplayName(username)));
}
exports.displayName = displayName;
function userProfile(user) {
    return get(joinPath(buildProfile(user)));
}
exports.userProfile = userProfile;
function userProfiles() {
    return get(joinPath(buildProfiles()));
}
exports.userProfiles = userProfiles;
function authRequestAccept(username, contact) {
    return get(joinPath(buildAuthRequestAccept(username, contact)));
}
exports.authRequestAccept = authRequestAccept;
function authRequestDecline(username, contact) {
    return get(joinPath(buildAuthRequestDecline(username, contact)));
}
exports.authRequestDecline = authRequestDecline;
//# sourceMappingURL=api-uri.js.map