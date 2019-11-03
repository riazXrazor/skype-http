"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const any_1 = require("kryo/types/any");
const array_1 = require("kryo/types/array");
const boolean_1 = require("kryo/types/boolean");
const date_1 = require("kryo/types/date");
const document_1 = require("kryo/types/document");
const ucs2_string_1 = require("kryo/types/ucs2-string");
const agent_1 = require("./agent");
const contact_profile_1 = require("./contact-profile");
const display_name_1 = require("./display-name");
const display_name_source_1 = require("./display-name-source");
const mri_key_1 = require("./mri-key");
const phone_1 = require("./phone");
const relationship_history_1 = require("./relationship-history");
exports.$Contact = new document_1.DocumentType({
    properties: {
        personId: { type: mri_key_1.$MriKey },
        mri: { type: mri_key_1.$MriKey },
        displayName: { type: display_name_1.$DisplayName },
        displayNameSource: { type: display_name_source_1.$DisplayNameSource },
        phones: { type: new array_1.ArrayType({ itemType: phone_1.$Phone, maxLength: Infinity }), optional: true },
        profile: { type: contact_profile_1.$ContactProfile },
        agent: { type: agent_1.$Agent, optional: true },
        authorized: { type: new boolean_1.BooleanType() },
        authCertificate: { type: new ucs2_string_1.Ucs2StringType({ maxLength: Infinity }), optional: true },
        blocked: { type: new boolean_1.BooleanType() },
        creationTime: { type: new date_1.DateType() },
        relationshipHistory: { type: relationship_history_1.$RelationshipHistory, optional: true },
        suggested: { type: new boolean_1.BooleanType(), optional: true },
        phoneHashes: { type: new array_1.ArrayType({ itemType: new any_1.AnyType(), maxLength: Infinity }), optional: true },
    },
});
//# sourceMappingURL=contact.js.map