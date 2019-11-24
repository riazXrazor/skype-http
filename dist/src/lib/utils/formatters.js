"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const incident_1 = require("incident");
const lodash_1 = __importDefault(require("lodash"));
const mri_1 = require("../mri");
const user_data_processor_1 = require("./user-data-processor");
function formatConversation(native) {
    // TODO: parse id
    if (native.id.indexOf("19:") === 0) {
        // thread
        return native;
    }
    else {
        // private
        const contact = native.id;
        const result = native;
        result.members = [contact];
        return result;
    }
}
exports.formatConversation = formatConversation;
// export function formatMessage(native: NativeMessage): Message {
//   // TODO: parse id
//   if (native.conversationid.indexOf("19:") === 0) {
//     // thread
//     return native;
//   } else {
//     // private
//     const contact: string = native.conversationid;
//     const result: Message = native;
//     result.members = [contact];
//     return result;
//   }
// }
function formatThread(native) {
    const memberIds = lodash_1.default.map(native.members, (member) => member.id);
    const properties = {};
    if ("properties" in native) {
        if ("topic" in native.properties) {
            properties.topic = native.properties.topic;
        }
        if ("lastjoinat" in native.properties) {
            properties.topic = native.properties.lastjoinat;
        }
        if ("version" in native.properties) {
            properties.topic = native.properties.version;
        }
    }
    return {
        threadProperties: properties,
        id: native.id,
        type: native.type,
        version: native.version,
        members: memberIds,
    };
}
exports.formatThread = formatThread;
function formatSearchContact(native) {
    return searchContactToPerson(native);
}
exports.formatSearchContact = formatSearchContact;
function formatContact(native) {
    return contactToPerson(native);
}
exports.formatContact = formatContact;
// github:demurgos/skype-web-reversed -> jSkype/modelHelpers/contacts/dataMappers/agentToPerson.js
function agentToPerson(native) { }
// TODO: check that the uri uses the HTTPS protocol
function ensureHttps(uri) {
    return uri;
}
function define(...args) {
    return null;
}
function searchContactToPerson(native) {
    let avatarUrl;
    if (typeof native.avatarUrl === "string") {
        avatarUrl = ensureHttps(native.avatarUrl);
        // TODO: ensure that the "cacheHeaders=1" queryString is there
    }
    else {
        avatarUrl = null;
    }
    const displayName = user_data_processor_1.sanitizeXml(native.displayname);
    const firstName = native.firstname !== undefined ? user_data_processor_1.sanitizeXml(native.firstname) : null;
    const lastName = native.lastname !== undefined ? user_data_processor_1.sanitizeXml(native.lastname) : null;
    const phoneNumbers = [];
    const locations = [];
    const type = mri_1.MriType.Skype;
    const typeKey = mri_1.mriTypeToTypeCode(type);
    let result;
    result = {
        id: {
            id: native.username,
            typeKey,
            typeName: mri_1.mriTypeToTypeName(type),
            raw: `${typeKey}:${native.username}`,
        },
        emails: native.emails,
        avatarUrl,
        phones: phoneNumbers,
        name: {
            first: firstName,
            surname: lastName,
            nickname: native.username,
            displayName,
        },
        activityMessage: native.mood,
        locations,
    };
    return result;
}
// github:demurgos/skype-web-reversed -> jSkype/modelHelpers/contacts/dataMappers/contactToPerson.js
function contactToPerson(native) {
    const SUGGESTED_CONTACT_ACTIVITY_MESSAGE = "Skype";
    // TODO(demurgos): typedef
    // tslint:disable-next-line:typedef
    const authorizationStates = {
        UNKNOWN: "UNKNOWN",
        UNAUTHORIZED: "UNAUTHORIZED",
        PENDING_OUTGOING: "PENDING_OUTGOING",
        PENDING_INCOMING: "PENDING_INCOMING",
        AUTHORIZED: "AUTHORIZED",
        SUGGESTED: "SUGGESTED",
    };
    // TODO(demurgos): typedef
    // tslint:disable-next-line:typedef
    const showStrategies = {
        ALL: "ALL",
        AVAILABLE_ONLY: "AVAILABLE_ONLY",
        AGENTS_ONLY: "AGENTS_ONLY",
    };
    let activityMessage;
    if (native.suggested) {
        activityMessage = SUGGESTED_CONTACT_ACTIVITY_MESSAGE;
    }
    else {
        activityMessage = native.mood === undefined ? null : native.mood;
    }
    let capabilities;
    if (native.type === "agent") {
        capabilities = native.agent.capabilities;
    }
    else if (native.type === "pstn") {
        capabilities = ["audio.receive", "group.add"];
    }
    else {
        capabilities = [];
    }
    let authorizationState;
    if (native.authorized) {
        authorizationState = authorizationStates.AUTHORIZED;
    }
    else if (native.suggested) {
        authorizationState = authorizationStates.SUGGESTED;
    }
    else {
        authorizationState = authorizationStates.PENDING_OUTGOING;
    }
    // We can safely cast here because `mriTypeFromTypeName` tests the validity of the name.
    const type = mri_1.mriTypeFromTypeName(native.type);
    const typeKey = mri_1.mriTypeToTypeCode(type);
    const isAgent = native.type === "agent";
    let avatarUrl;
    if (typeof native.avatar_url === "string") {
        avatarUrl = ensureHttps(native.avatar_url);
        // TODO: ensure that the "cacheHeaders=1" queryString is there
    }
    else {
        avatarUrl = null;
    }
    const displayName = user_data_processor_1.sanitizeXml(native.display_name);
    let firstName = null;
    let lastName = null;
    if (native.name !== undefined && native.name.first !== undefined) {
        firstName = user_data_processor_1.sanitizeXml(native.name.first);
    }
    if (native.name !== undefined && native.name.surname !== undefined) {
        lastName = user_data_processor_1.sanitizeXml(native.name.surname);
    }
    const phoneNumbers = [];
    const locations = [];
    let result;
    result = {
        id: {
            id: native.id,
            typeKey,
            typeName: native.type,
            raw: `${typeKey}:${native.id}`,
        },
        avatarUrl,
        phones: phoneNumbers,
        name: {
            first: firstName,
            surname: lastName,
            nickname: native.id,
            displayName,
        },
        activityMessage,
        locations,
    };
    return result;
}
// github:demurgos/skype-web-reversed -> jSkype/modelHelpers/contacts/dataMappers/dataMaps.js
function phoneTypeNameToPhoneTypeKey(typeName) {
    switch (typeName) {
        case "Home":
            return "0";
        case "Work":
            return "1";
        case "Cell":
            return "2";
        case "Other":
            return "3";
        default:
            throw new incident_1.Incident("unknown-phone-type-name", { typeName }, `Unknwon phone type name ${typeName}`);
    }
}
// github:demurgos/skype-web-reversed -> jSkype/modelHelpers/contacts/dataMappers/dataMaps.js
function phoneTypeKeyToPhoneTypeName(typeKey) {
    switch (typeKey) {
        case "0":
            return "Home";
        case "1":
            return "Work";
        case "2":
            return "Cell";
        case "3":
            return "Other";
        default:
            throw new incident_1.Incident("unknown-phone-type-key", { typeCode: typeKey }, `Unknwon phone type key ${typeKey}`);
    }
}
//# sourceMappingURL=formatters.js.map