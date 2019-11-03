"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const date_1 = require("kryo/types/date");
const document_1 = require("kryo/types/document");
const ucs2_string_1 = require("kryo/types/ucs2-string");
exports.$InviteMessage = new document_1.DocumentType({
    properties: {
        message: { type: new ucs2_string_1.Ucs2StringType({ maxLength: Infinity }) },
        time: { type: new date_1.DateType() },
    },
});
//# sourceMappingURL=invite-message.js.map