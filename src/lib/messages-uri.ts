import {resolve as resolveUri, parse as parseUri} from "url";
import {posix} from "path";
import Incident from "incident";

export const DEFAULT_USER: string = "ME";
export const DEFAULT_ENDPOINT: string = "SELF";

const CONVERSATION_PATTERN = /^\/v1\/users\/([^/]+)\/conversations\/([^/]+)$/;
const CONTACT_PATTERN = /^\/v1\/users\/([^/]+)\/contacts\/([^/]+)$/;
const MESSAGES_PATTERN = /^\/v1\/users\/([^/]+)\/conversations\/([^/]+)\/messages$/;

function joinPath(parts: string[]): string {
  return posix.join.apply(null, parts);
}

// The following functions build an array of parts to build the path

// /v1
function buildV1(): string[] {
  return ["v1"];
}

// /v1/users
function buildUsers(): string[] {
  return buildV1().concat("users");
}

// /v1/users/{user}
function buildUser (user: string): string[] {
  return buildUsers().concat(user);
}

// /v1/users/{user}/endpoints
function buildEndpoints (user: string): string[] {
  return buildUser(user).concat("endpoints");
}

// /v1/users/{user}/endpoints/{endpoint}
function buildEndpoint (user: string, endpoint: string): string[] {
  return buildEndpoints(user).concat(endpoint);
}

// /v1/users/{user}/endpoints/{endpoint}/subscriptions
function buildSubscriptions (user: string, endpoint: string): string[] {
  return buildEndpoint(user, endpoint).concat("subscriptions");
}

// /v1/users/{user}/endpoints/{endpoint}/subscriptions/{subscription}
function buildSubscription (user: string, endpoint: string, subscription: number): string[] {
  return buildSubscriptions(user, endpoint).concat(String(subscription));
}

// /v1/users/{user}/endpoints/{endpoint}/subscriptions/{subscription}/poll
function buildPoll (user: string, endpoint: string, subscription: number): string[] {
  return buildSubscription(user, endpoint, subscription).concat("poll");
}

// /v1/users/{user}/endpoints/{endpoint}/presenceDocs
function buildEndpointPresenceDocs (user: string, endpoint: string): string[] {
  return buildEndpoint(user, endpoint).concat("presenceDocs");
}

// /v1/users/{user}/endpoints/{endpoint}/presenceDocs/endpointMessagingService
function buildEndpointMessagingService (user: string, endpoint: string): string[] {
  return buildEndpointPresenceDocs(user, endpoint).concat("endpointMessagingService");
}

// /v1/users/{user}/conversations
function buildConversations (user: string): string[] {
  return buildUser(user).concat("conversations");
}

// /v1/users/{user}/conversations/{conversation}
function buildConversation (user: string, conversation: string): string[] {
  return buildConversations(user).concat(conversation);
}

// /v1/users/{user}/conversations/{conversation}/messages
function buildMessages (user: string, conversation: string): string[] {
  return buildConversation(user, conversation).concat("messages");
}

// /v1/users/{user}/presenceDocs
function buildUserPresenceDocs (user: string): string[] {
  return buildUser(user).concat("presenceDocs");
}

// /v1/users/{user}/presenceDocs/endpointMessagingService
function buildUserMessagingService (user: string): string[] {
  return buildUserPresenceDocs(user).concat("endpointMessagingService");
}

/**
 * Returns an URI origin like: "https://host.com"
 * If host is `null`, returns an empty string
 */
function getOrigin (host: string): string {
  return host === null ? "": "https://" + host;
}

function get(host: string, path: string) {
  return resolveUri(getOrigin(host), path);
}

export function users (host: string): string {
  return get(host, joinPath(buildUsers()));
}

export function user (host: string, userId: string = DEFAULT_USER): string {
  return get(host, joinPath(buildUser(userId)));
}

export function endpoints (host: string, userId: string = DEFAULT_USER): string {
  return get(host, joinPath(buildEndpoints(userId)));
}

export function endpoint (host: string, userId: string = DEFAULT_USER, endpointId: string = DEFAULT_ENDPOINT): string {
  return get(host, joinPath(buildEndpoint(userId, endpointId)));
}

export function poll (host: string, userId: string = DEFAULT_USER, endpointId: string = DEFAULT_ENDPOINT, subscriptionId: number = 0): string {
  return get(host, joinPath(buildPoll(userId, endpointId, subscriptionId)));
}

/**
 * Returns https://{host}/v1/users/{userId}/endpoints/{endpointId}/subscriptions
 * @param host
 * @param userId
 * @param endpointId
 */
export function subscriptions (host: string, userId: string = DEFAULT_USER, endpointId: string = DEFAULT_ENDPOINT): string {
  return get(host, joinPath(buildSubscriptions(userId, endpointId)));
}

/**
 * Returns https://{host}/v1/users/{user}/conversations/{conversationId}/messages
 * @param host
 * @param user
 * @param conversationId
 */
export function messages (host: string, user: string, conversationId: string): string {
  return get(host, joinPath(buildMessages(user, conversationId)));
}

export function userMessagingService (host: string, user: string = DEFAULT_USER): string {
  return get(host, joinPath(buildUserMessagingService(user)));
}

export function endpointMessagingService (host: string, user: string = DEFAULT_USER, endpoint: string = DEFAULT_ENDPOINT): string {
  return get(host, joinPath(buildEndpointMessagingService(user, endpoint)));
}

export interface ContactUri {
  host: string;
  user: string;
  contact: string;
}

export function parseContact (uri: string): ContactUri {
  const parsed = parseUri(uri);
  const match = CONTACT_PATTERN.exec(parsed.pathname);
  if (match === null) {
    throw new Incident("parse-error", "Expected URI to be a conversation uri");
  }
  return {
    host: parsed.host,
    user: match[1],
    contact: match[2]
  };
}

export interface ConversationUri {
  host: string;
  user: string;
  conversation: string;
}

export function parseConversation (uri: string): ConversationUri {
  const parsed = parseUri(uri);
  const match = CONVERSATION_PATTERN.exec(parsed.pathname);
  if (match === null) {
    throw new Incident("parse-error", "Expected URI to be a conversation uri");
  }
  return {
    host: parsed.host,
    user: match[1],
    conversation: match[2]
  };
}