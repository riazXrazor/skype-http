"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const any_1 = require("kryo/types/any");
const array_1 = require("kryo/types/array");
const document_1 = require("kryo/types/document");
const ucs2_string_1 = require("kryo/types/ucs2-string");
const contact_1 = require("../../types/contact");
const contact_group_1 = require("../../types/contact-group");
/**
 * @internal
 */
exports.$GetUserResult = new document_1.DocumentType({
    properties: {
        contacts: { type: new array_1.ArrayType({ itemType: contact_1.$Contact, maxLength: Infinity }) },
        blocklist: { type: new array_1.ArrayType({ itemType: new any_1.AnyType(), maxLength: Infinity }) },
        groups: { type: new array_1.ArrayType({ itemType: contact_group_1.$ContactGroup, maxLength: Infinity }) },
        scope: { type: new ucs2_string_1.Ucs2StringType({ maxLength: Infinity }) },
    },
});
//# sourceMappingURL=get-user.js.map