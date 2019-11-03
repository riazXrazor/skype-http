"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const any_1 = require("kryo/types/any");
const array_1 = require("kryo/types/array");
const document_1 = require("kryo/types/document");
const null_1 = require("kryo/types/null");
const try_union_1 = require("kryo/types/try-union");
const ucs2_string_1 = require("kryo/types/ucs2-string");
const url_1 = require("./url");
function nullable(type) {
    return new try_union_1.TryUnionType({
        variants: [
            new null_1.NullType(),
            type,
        ],
    });
}
exports.$ApiProfile = new document_1.DocumentType({
    properties: {
        firstname: { type: new ucs2_string_1.Ucs2StringType({ maxLength: Infinity }) },
        lastname: { type: nullable(new ucs2_string_1.Ucs2StringType({ maxLength: Infinity })) },
        birthday: { type: new any_1.AnyType() },
        gender: { type: new any_1.AnyType() },
        language: { type: new any_1.AnyType() },
        country: { type: new any_1.AnyType() },
        province: { type: new any_1.AnyType() },
        city: { type: new any_1.AnyType() },
        homepage: { type: new any_1.AnyType() },
        about: { type: new any_1.AnyType() },
        emails: { type: new array_1.ArrayType({ itemType: new ucs2_string_1.Ucs2StringType({ maxLength: Infinity }), maxLength: Infinity }) },
        jobtitle: { type: new any_1.AnyType() },
        phoneMobile: { type: new any_1.AnyType() },
        phoneHome: { type: new any_1.AnyType() },
        phoneOffice: { type: new any_1.AnyType() },
        mood: { type: new any_1.AnyType() },
        richMood: { type: new any_1.AnyType() },
        avatarUrl: { type: nullable(url_1.$Url) },
        username: { type: new ucs2_string_1.Ucs2StringType({ maxLength: Infinity }) },
    },
});
//# sourceMappingURL=api-profile.js.map