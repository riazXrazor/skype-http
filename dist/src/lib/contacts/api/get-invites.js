"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const array_1 = require("kryo/types/array");
const document_1 = require("kryo/types/document");
const invite_1 = require("../../types/invite");
/**
 * @internal
 */
exports.$GetInvitesResult = new document_1.DocumentType({
    properties: {
        inviteList: { type: new array_1.ArrayType({ itemType: invite_1.$Invite, maxLength: Infinity }) },
    },
});
//# sourceMappingURL=get-invites.js.map