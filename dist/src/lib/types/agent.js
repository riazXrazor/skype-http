"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const any_1 = require("kryo/types/any");
const array_1 = require("kryo/types/array");
const document_1 = require("kryo/types/document");
const ucs2_string_1 = require("kryo/types/ucs2-string");
const agent_info_1 = require("./agent-info");
exports.$Agent = new document_1.DocumentType({
    properties: {
        capabilities: { type: new array_1.ArrayType({ itemType: new any_1.AnyType(), maxLength: Infinity }), optional: true },
        type: { type: new ucs2_string_1.Ucs2StringType({ maxLength: Infinity }) },
        trust: { type: new ucs2_string_1.Ucs2StringType({ maxLength: Infinity }) },
        info: { type: agent_info_1.$AgentInfo },
        stageInfo: { type: new any_1.AnyType(), optional: true },
    },
});
//# sourceMappingURL=agent.js.map