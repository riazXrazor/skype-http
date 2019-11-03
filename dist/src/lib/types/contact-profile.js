"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const array_1 = require("kryo/types/array");
const document_1 = require("kryo/types/document");
const ucs2_string_1 = require("kryo/types/ucs2-string");
const iso_date_1 = require("./iso-date");
const location_1 = require("./location");
const name_1 = require("./name");
const phone_1 = require("./phone");
const url_1 = require("./url");
exports.$ContactProfile = new document_1.DocumentType({
    properties: {
        avatarUrl: { type: url_1.$Url, optional: true },
        birthday: { type: iso_date_1.$IsoDate, optional: true },
        gender: { type: new ucs2_string_1.Ucs2StringType({ maxLength: Infinity }), optional: true },
        locations: { type: new array_1.ArrayType({ itemType: location_1.$Location, maxLength: Infinity }), optional: true },
        phones: { type: new array_1.ArrayType({ itemType: phone_1.$Phone, maxLength: Infinity }), optional: true },
        mood: { type: new ucs2_string_1.Ucs2StringType({ maxLength: Infinity }), optional: true },
        name: { type: name_1.$Name, optional: true },
        about: { type: new ucs2_string_1.Ucs2StringType({ maxLength: Infinity }), optional: true },
        website: { type: new ucs2_string_1.Ucs2StringType({ maxLength: Infinity }), optional: true },
        language: { type: new ucs2_string_1.Ucs2StringType({ maxLength: Infinity }), optional: true },
    },
});
//# sourceMappingURL=contact-profile.js.map