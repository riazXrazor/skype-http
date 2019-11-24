"use strict";
// tslint:disable:max-line-length
/**
 * This module handles MRI keys
 *
 * MRI may stand for MSN Resource Identifier (open an issue if you have a better idea).
 *
 * An MRI key is a string of the format: `${type}:${id}` where `id` can be a string of (at least)
 * ascii letters and digits (it cannot start by `\d+:`) and `type` is a decimal code.
 *
 * Examples:
 * - `1:bob`
 * - `4:+15553485`
 * - `8:bob`
 * - `8:guest:bob`
 * - `8:live:bob`
 *
 * @see https://github.com/demurgos/skype-web-reversed/tree/bb30da685fb7d2d06f1ba740283d6cbbaeb2c502/skype/latest/decompiled/fullExperience/rjs%24%24swx-mri/lib
 */
// tslint:enable
Object.defineProperty(exports, "__esModule", { value: true });
const incident_1 = require("incident");
var MriType;
(function (MriType) {
    MriType["Agent"] = "agent";
    MriType["Lync"] = "lync";
    MriType["Msn"] = "msn";
    MriType["Skype"] = "skype";
    /**
     * Public switched telephone network
     */
    MriType["Pstn"] = "pstn";
    /**
     * This is not the official name (but it is likely).
     * This MRI type was added to properly handle the type code `19`.
     */
    MriType["GroupConversation"] = "group_conversation";
})(MriType = exports.MriType || (exports.MriType = {}));
const MRI_TYPE_TO_TYPE_CODE = new Map([
    [MriType.Agent, "28"],
    [MriType.Lync, "2"],
    [MriType.Msn, "1"],
    [MriType.Skype, "8"],
    [MriType.Pstn, "4"],
    [MriType.GroupConversation, "19"]
]);
const MRI_TYPE_FROM_TYPE_CODE = reverseMap(MRI_TYPE_TO_TYPE_CODE);
const MRI_TYPE_TO_TYPE_NAME = new Map([
    [MriType.Agent, "agent"],
    [MriType.Lync, "lync"],
    [MriType.Msn, "msn"],
    [MriType.Skype, "skype"],
    [MriType.Pstn, "pstn"],
    [MriType.GroupConversation, "group_conversation"]
]);
const MRI_TYPE_FROM_TYPE_NAME = reverseMap(MRI_TYPE_TO_TYPE_NAME);
// TODO: Move outside of this module
function reverseMap(source) {
    const result = new Map();
    for (const [key, value] of source.entries()) {
        if (result.has(value)) {
            throw new incident_1.Incident("DuplicateValue", { map: source });
        }
        result.set(value, key);
    }
    return result;
}
/**
 * Converts an MRI type to the corresponding MRI type code.
 *
 * @param type The MRI type.
 * @return The corresponding MRI type code.
 * @internal
 */
function mriTypeToTypeCode(type) {
    const result = MRI_TYPE_TO_TYPE_CODE.get(type);
    if (result === undefined) {
        throw new incident_1.Incident("UnknownMriType", { type });
    }
    return result;
}
exports.mriTypeToTypeCode = mriTypeToTypeCode;
/**
 * Converts an MRI type code to the corresponding MRI type.
 *
 * @param typeCode The MRI type code.
 * @return The corresponding MRI type.
 * @internal
 */
function mriTypeFromTypeCode(typeCode) {
    const result = MRI_TYPE_FROM_TYPE_CODE.get(typeCode);
    if (result === undefined) {
        throw new incident_1.Incident("UnknownMriTypeCode", { typeCode });
    }
    return result;
}
exports.mriTypeFromTypeCode = mriTypeFromTypeCode;
/**
 * Converts an MRI type to the corresponding MRI type name.
 *
 * @param type The MRI type.
 * @return The corresponding MRI type name.
 * @internal
 */
function mriTypeToTypeName(type) {
    const result = MRI_TYPE_TO_TYPE_NAME.get(type);
    if (result === undefined) {
        throw new incident_1.Incident("UnknownMriType", { type });
    }
    return result;
}
exports.mriTypeToTypeName = mriTypeToTypeName;
/**
 * Converts an MRI type name to the corresponding MRI type.
 *
 * @param typeName The MRI type name.
 * @return The corresponding MRI type.
 * @internal
 */
function mriTypeFromTypeName(typeName) {
    const result = MRI_TYPE_FROM_TYPE_NAME.get(typeName);
    if (result === undefined) {
        throw new incident_1.Incident("UnknownMriTypeName", { typeName });
    }
    return result;
}
exports.mriTypeFromTypeName = mriTypeFromTypeName;
/**
 * Pattern matching MRI keys. It has two capture groups:
 * - Group 1: Type code
 * - Group 2: Id
 *
 * The universal matcher for the id part matches the behavior found in
 * skype-web-reversed (v1.107.13).
 * There is still a difference: we assume that there is a single type code prefix while
 * the retrieved regexp is `/^(?:(\d+):)+/`.
 * This means that they can parse `4:8:bob` to the type code `"8"` and id `"bob"`.
 * Instead of that, our pattern parses to the type code `"4"` and id `"8:bob"` (but then
 * the parse function throws an error because the `id` is invalid).
 */
const MRI_KEY_PATTERN = /^(\d+):([\s\S]+)$/;
function getId(mriKey) {
    return parse(mriKey).id;
}
exports.getId = getId;
function getType(mriKey) {
    return parse(mriKey).type;
}
exports.getType = getType;
/**
 * Tests if an id is Phone Switched Telephone Network (PSTN) identifier (a phone number).
 *
 * A PSTN id is a decimal number, optionally prefixed by a plus sign (`+`).
 *
 * @param id ID to test
 * @return Boolean indicating if `id` is a PSTN id
 */
function isPstnId(id) {
    return /^(?:\+)?\d+$/.test(id);
}
exports.isPstnId = isPstnId;
/**
 * Tests if an id is guest identifier.
 *
 * A guest id starts by `guest:`.
 *
 * @param id ID to test
 * @return Boolean indicating if `id` is a guest id
 */
function isGuestId(id) {
    return /^guest:/.test(id);
}
exports.isGuestId = isGuestId;
/**
 * Tests if a string is a well-formed MRI key.
 *
 * @param str The string to test
 * @return Boolean indicating if `str` is a well-formed MRI key
 */
function isMriKey(str) {
    return /^(?:(\d+):)+/.test(str);
}
exports.isMriKey = isMriKey;
/**
 * Creates an MRI key if needed
 *
 * If `mriKeyOrId` is already an MRI key, returns it immediately.
 * Otherwise, creates an MRI key with the type `type` and id `mriKeyOrId`.
 *
 * @param {MriKey | string} mriKeyOrId
 * @param {MriType} type
 * @return {string}
 */
function asMriKey(mriKeyOrId, type) {
    if (isMriKey(mriKeyOrId)) {
        return mriKeyOrId;
    }
    const id = mriKeyOrId;
    if (isPstnId(id)) {
        // TODO: We are enforcing the PSTN type. We should check the value of `type` and raise a
        //       warning if it is not Pstn.
        return format({ type: MriType.Pstn, id });
    }
    else {
        return format({ type, id });
    }
}
exports.asMriKey = asMriKey;
function isValidId(id) {
    return !MRI_KEY_PATTERN.test(id);
}
function format(mri) {
    if (!isValidId(mri.id)) {
        throw new incident_1.Incident("InvalidMriId", { id: mri.id });
    }
    return `${mriTypeToTypeCode(mri.type)}:${mri.id}`;
}
exports.format = format;
function parse(mri) {
    const match = MRI_KEY_PATTERN.exec(mri);
    if (match === null) {
        throw new incident_1.Incident("InvalidMriKey", { key: mri });
    }
    // We can cast here because `mriTypeFromTypeCode` tests the validity of the MRI code.
    const type = mriTypeFromTypeCode(match[1]);
    const id = match[2];
    if (isValidId(id)) {
        throw new incident_1.Incident("InvalidMriId", { id });
    }
    return { type, id };
}
exports.parse = parse;
//# sourceMappingURL=mri.js.map