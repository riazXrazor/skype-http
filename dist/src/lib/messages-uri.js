"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const incident_1 = require("incident");
const path_1 = __importDefault(require("path"));
const url_1 = __importDefault(require("url"));
exports.DEFAULT_USER = "ME";
exports.DEFAULT_ENDPOINT = "SELF";
const CONVERSATION_PATTERN = /^\/v1\/users\/([^/]+)\/conversations\/([^/]+)$/;
const CONTACT_PATTERN = /^\/v1\/users\/([^/]+)\/contacts\/([^/]+)$/;
const MESSAGES_PATTERN = /^\/v1\/users\/([^/]+)\/conversations\/([^/]+)\/messages$/;
const MESSAGE_PATTERN = /^\/v1\/users\/([^/]+)\/conversations\/([^/]+)\/messages\/([^/]+)$/;
function joinPath(parts) {
    return path_1.default.posix.join.apply(null, parts);
}
// The following functions build an array of parts to build the path
// /v1
function buildV1() {
    return ["v1"];
}
// /v1/threads
function buildThreads() {
    return buildV1().concat("threads");
}
// /v1/threads/{thread}
function buildThread(thread) {
    return buildThreads().concat(thread);
}
// /v1/threads/{thread}/properties
function buildProperties(thread) {
    return buildThread(thread).concat("properties");
}
// /v1/threads/{thread}/members
function buildMembers(thread) {
    return buildThread(thread).concat("members");
}
// /v1/threads/{thread}/members/{member}
function buildMember(thread, member) {
    return buildMembers(thread).concat(member);
}
// /v1/users
function buildUsers() {
    return buildV1().concat("users");
}
// /v1/users/{user}
function buildUser(user) {
    return buildUsers().concat(user);
}
// /v1/users/{user}/endpoints
function buildEndpoints(user) {
    return buildUser(user).concat("endpoints");
}
// /v1/users/{user}/endpoints/{endpoint}
function buildEndpoint(user, endpoint) {
    return buildEndpoints(user).concat(endpoint);
}
// /v1/users/{user}/endpoints/{endpoint}/subscriptions
function buildSubscriptions(user, endpoint) {
    return buildEndpoint(user, endpoint).concat("subscriptions");
}
// /v1/users/{user}/endpoints/{endpoint}/subscriptions/{subscription}
function buildSubscription(user, endpoint, subscription) {
    return buildSubscriptions(user, endpoint).concat(String(subscription));
}
// /v1/users/{user}/endpoints/{endpoint}/subscriptions/{subscription}/poll
function buildPoll(user, endpoint, subscription) {
    return buildSubscription(user, endpoint, subscription).concat("poll");
}
// /v1/users/{user}/endpoints/{endpoint}/presenceDocs
function buildEndpointPresenceDocs(user, endpoint) {
    return buildEndpoint(user, endpoint).concat("presenceDocs");
}
// /v1/users/{user}/endpoints/{endpoint}/presenceDocs/endpointMessagingService
function buildEndpointMessagingService(user, endpoint) {
    return buildEndpointPresenceDocs(user, endpoint).concat("endpointMessagingService");
}
// /v1/users/{user}/conversations
function buildConversations(user) {
    return buildUser(user).concat("conversations");
}
// /v1/users/{user}/conversations/{conversation}
function buildConversation(user, conversation) {
    return buildConversations(user).concat(conversation);
}
// /v1/users/{user}/conversations/{conversation}/messages
function buildMessages(user, conversation) {
    return buildConversation(user, conversation).concat("messages");
}
// /v1/users/{user}/presenceDocs
function buildUserPresenceDocs(user) {
    return buildUser(user).concat("presenceDocs");
}
// /v1/users/{user}/presenceDocs/endpointMessagingService
function buildUserMessagingService(user) {
    return buildUserPresenceDocs(user).concat("endpointMessagingService");
}
// /v1/objects
function buildObjects() {
    return buildV1().concat("objects");
}
// /v1/objects/{objectId}
function buildObject(objectId) {
    return buildObjects().concat(objectId);
}
// /v1/objects/{objectId}/content/{content}
function buildObjectContent(objectId, content) {
    return buildObject(objectId)
        .concat("content")
        .concat(content);
}
// /v1/objects/{objectId}/view/{content}
function buildObjectView(objectId, view) {
    return buildObject(objectId)
        .concat("view")
        .concat(view);
}
/**
 * Returns an URI origin like: "https://host.com"
 * If host is `null`, returns an empty string
 */
function getOrigin(host) {
    return host === null ? "" : "https://" + host;
}
function get(host, p) {
    return url_1.default.resolve(getOrigin(host), p);
}
function threads(host) {
    return get(host, joinPath(buildThreads()));
}
exports.threads = threads;
function thread(host, threadId) {
    return get(host, joinPath(buildThread(threadId)));
}
exports.thread = thread;
function member(host, threadId, member) {
    return get(host, joinPath(buildMember(threadId, member)));
}
exports.member = member;
function properties(host, threadId) {
    return get(host, joinPath(buildProperties(threadId)));
}
exports.properties = properties;
function users(host) {
    return get(host, joinPath(buildUsers()));
}
exports.users = users;
function user(host, userId = exports.DEFAULT_USER) {
    return get(host, joinPath(buildUser(userId)));
}
exports.user = user;
/**
 * Build the URI for the endpoints of a user.
 *
 * Template: `https://{host}/v1/users/{userId}/endpoints`
 *
 * @param host Hostname of the messages server.
 * @param userId Id of the user. Default: `"ME"`.
 * @return Formatted URI.
 */
function endpoints(host, userId = exports.DEFAULT_USER) {
    return get(host, joinPath(buildEndpoints(userId)));
}
exports.endpoints = endpoints;
function endpoint(host, userId = exports.DEFAULT_USER, endpointId = exports.DEFAULT_ENDPOINT) {
    return get(host, joinPath(buildEndpoint(userId, endpointId)));
}
exports.endpoint = endpoint;
function poll(host, userId = exports.DEFAULT_USER, endpointId = exports.DEFAULT_ENDPOINT, subscriptionId = 0) {
    return get(host, joinPath(buildPoll(userId, endpointId, subscriptionId)));
}
exports.poll = poll;
/**
 * Returns https://{host}/v1/users/{userId}/endpoints/{endpointId}/subscriptions
 * @param host
 * @param userId
 * @param endpointId
 */
function subscriptions(host, userId = exports.DEFAULT_USER, endpointId = exports.DEFAULT_ENDPOINT) {
    return get(host, joinPath(buildSubscriptions(userId, endpointId)));
}
exports.subscriptions = subscriptions;
function conversations(host, user) {
    return get(host, joinPath(buildConversations(user)));
}
exports.conversations = conversations;
function conversation(host, user, conversationId) {
    return get(host, joinPath(buildConversation(user, conversationId)));
}
exports.conversation = conversation;
/**
 * Returns https://{host}/v1/users/{user}/conversations/{conversationId}/messages
 * @param host
 * @param user
 * @param conversationId
 */
function messages(host, user, conversationId) {
    return get(host, joinPath(buildMessages(user, conversationId)));
}
exports.messages = messages;
function objects(host) {
    return get(host, joinPath(buildObjects()));
}
exports.objects = objects;
function object(host, objectId) {
    return get(host, joinPath(buildObject(objectId)));
}
exports.object = object;
function objectContent(host, objectId, content) {
    return get(host, joinPath(buildObjectContent(objectId, content)));
}
exports.objectContent = objectContent;
function objectView(host, objectId, view) {
    return get(host, joinPath(buildObjectView(objectId, view)));
}
exports.objectView = objectView;
function userMessagingService(host, user = exports.DEFAULT_USER) {
    return get(host, joinPath(buildUserMessagingService(user)));
}
exports.userMessagingService = userMessagingService;
function endpointMessagingService(host, user = exports.DEFAULT_USER, endpoint = exports.DEFAULT_ENDPOINT) {
    return get(host, joinPath(buildEndpointMessagingService(user, endpoint)));
}
exports.endpointMessagingService = endpointMessagingService;
function parseMessage(uri) {
    const parsed = url_1.default.parse(uri);
    if (parsed.host === undefined || parsed.pathname === undefined) {
        throw new incident_1.Incident("parse-error", "Expected URI to have a host and path");
    }
    const match = MESSAGE_PATTERN.exec(parsed.pathname);
    if (match === null) {
        throw new incident_1.Incident("parse-error", "Expected URI to be a message uri");
    }
    return {
        host: parsed.host,
        user: match[1],
        conversation: match[2],
        message: match[3]
    };
}
exports.parseMessage = parseMessage;
function parseContact(uri) {
    const parsed = url_1.default.parse(uri);
    if (parsed.host === undefined || parsed.pathname === undefined) {
        throw new incident_1.Incident("parse-error", "Expected URI to have a host and path");
    }
    const match = CONTACT_PATTERN.exec(parsed.pathname);
    if (match === null) {
        throw new incident_1.Incident("parse-error", "Expected URI to be a conversation uri");
    }
    return {
        host: parsed.host,
        user: match[1],
        contact: match[2]
    };
}
exports.parseContact = parseContact;
function parseConversation(uri) {
    const parsed = url_1.default.parse(uri);
    if (parsed.host === undefined || parsed.pathname === undefined) {
        throw new incident_1.Incident("parse-error", "Expected URI to have a host and path");
    }
    const match = CONVERSATION_PATTERN.exec(parsed.pathname);
    if (match === null) {
        throw new incident_1.Incident("parse-error", "Expected URI to be a conversation uri");
    }
    return {
        host: parsed.host,
        user: match[1],
        conversation: match[2]
    };
}
exports.parseConversation = parseConversation;
//# sourceMappingURL=messages-uri.js.map