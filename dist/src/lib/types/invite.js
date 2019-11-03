"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const array_1 = require("kryo/types/array");
const document_1 = require("kryo/types/document");
const display_name_1 = require("./display-name");
const invite_message_1 = require("./invite-message");
const mri_key_1 = require("./mri-key");
const url_1 = require("./url");
/**
 * Runtime representation of the [[Invite]] type.
 */
exports.$Invite = new document_1.DocumentType({
    properties: {
        mri: { type: mri_key_1.$MriKey },
        displayname: { type: display_name_1.$DisplayName },
        avatarUrl: { type: url_1.$Url },
        invites: { type: new array_1.ArrayType({ itemType: invite_message_1.$InviteMessage, maxLength: Infinity }) },
    },
});
//# sourceMappingURL=invite.js.map