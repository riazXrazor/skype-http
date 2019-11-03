"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const document_1 = require("kryo/types/document");
const ucs2_string_1 = require("kryo/types/ucs2-string");
exports.$Name = new document_1.DocumentType({
    properties: {
        first: { type: new ucs2_string_1.Ucs2StringType({ maxLength: Infinity }), optional: true },
        surname: { type: new ucs2_string_1.Ucs2StringType({ maxLength: Infinity }), optional: true },
        nickname: { type: new ucs2_string_1.Ucs2StringType({ maxLength: Infinity }), optional: true },
        company: { type: new ucs2_string_1.Ucs2StringType({ maxLength: Infinity }), optional: true },
    },
});
//# sourceMappingURL=name.js.map