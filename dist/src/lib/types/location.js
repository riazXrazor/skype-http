"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const document_1 = require("kryo/types/document");
const ucs2_string_1 = require("kryo/types/ucs2-string");
exports.$Location = new document_1.DocumentType({
    properties: {
        type: { type: new ucs2_string_1.Ucs2StringType({ maxLength: Infinity }) },
        country: { type: new ucs2_string_1.Ucs2StringType({ maxLength: Infinity }), optional: true },
        city: { type: new ucs2_string_1.Ucs2StringType({ maxLength: Infinity }), optional: true },
        state: { type: new ucs2_string_1.Ucs2StringType({ maxLength: Infinity }), optional: true },
    },
});
//# sourceMappingURL=location.js.map