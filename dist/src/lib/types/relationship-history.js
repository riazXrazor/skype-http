"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const array_1 = require("kryo/types/array");
const document_1 = require("kryo/types/document");
const any_1 = require("kryo/types/any");
exports.$RelationshipHistory = new document_1.DocumentType({
    properties: {
        sources: { type: new array_1.ArrayType({ itemType: new any_1.AnyType(), maxLength: Infinity }) },
    },
});
//# sourceMappingURL=relationship-history.js.map