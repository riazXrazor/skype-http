"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const boolean_1 = require("kryo/types/boolean");
const document_1 = require("kryo/types/document");
const ucs2_string_1 = require("kryo/types/ucs2-string");
exports.$ContactGroup = new document_1.DocumentType({
    properties: {
        id: { type: new ucs2_string_1.Ucs2StringType({ maxLength: Infinity }) },
        name: { type: new ucs2_string_1.Ucs2StringType({ maxLength: Infinity }) },
        isFavorite: { type: new boolean_1.BooleanType(), optional: true },
    },
});
//# sourceMappingURL=contact-group.js.map