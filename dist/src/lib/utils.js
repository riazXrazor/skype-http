"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
/**
 * Returns the number of seconds since epoch.
 *
 * @returns {number}
 */
function getCurrentTime() {
    return Math.floor((new Date().getTime()) / 1000);
}
exports.getCurrentTime = getCurrentTime;
/**
 * Adds zeros to the left of the string representation of number until its length is equal to len.
 * @param number
 * @param len
 * @returns {string}
 */
function zeroPad(number, len) {
    return padLeft(number, len, "0");
}
exports.zeroPad = zeroPad;
function padLeft(str, len, char = " ") {
    let result = String(str);
    const missing = len - result.length;
    if (missing > 0) {
        result = `${stringFromChar(char, missing)}${str}`;
    }
    return result;
}
exports.padLeft = padLeft;
function padRight(str, len, char = " ") {
    let result = String(str);
    const missing = len - result.length;
    if (missing > 0) {
        result = `${str}${stringFromChar(char, missing)}`;
    }
    return result;
}
exports.padRight = padRight;
function stringFromChar(char, count) {
    // TODO: count+1 ?
    return new Array(count - 1).join(char);
}
exports.stringFromChar = stringFromChar;
function getTimezone() {
    let sign;
    const timezone = (new Date()).getTimezoneOffset() * (-1);
    if (timezone >= 0) {
        sign = "+";
    }
    else {
        sign = "-";
    }
    const absTmezone = Math.abs(timezone);
    const minutes = absTmezone % 60;
    const hours = (absTmezone - minutes) / 60;
    return `${sign}${zeroPad(hours, 2)}|${zeroPad(minutes, 2)}`;
}
exports.getTimezone = getTimezone;
const HTTP_HEADER_SEPARATOR = ";";
const HTTP_HEADER_OPERATOR = "=";
function stringifyHeaderParams(params) {
    const headerPairs = lodash_1.default.map(params, (value, key) => {
        if (value === undefined) {
            throw new Error(`Undefined value for the header: ${key}`);
        }
        return `${key.replace(/%20/gm, "+")}=${value.replace(/%20/gm, "+")}`;
    });
    // The space after the separator is important, otherwise Skype is unable to parse the header
    return headerPairs.join(HTTP_HEADER_SEPARATOR + " ");
}
exports.stringifyHeaderParams = stringifyHeaderParams;
// TODO: check with skype-web-reversed
function parseHeaderParams(params) {
    const result = new Map();
    params
        .split(HTTP_HEADER_SEPARATOR)
        .forEach(paramString => {
        paramString = lodash_1.default.trim(paramString);
        const operatorIdx = paramString.indexOf(HTTP_HEADER_OPERATOR);
        let key;
        let val;
        // Ensure that the operator is not at the start or end of the parameters string
        if (1 <= operatorIdx && operatorIdx + HTTP_HEADER_OPERATOR.length < paramString.length - 1) {
            key = lodash_1.default.trim(paramString.substring(0, operatorIdx));
            val = lodash_1.default.trim(paramString.substring(operatorIdx + HTTP_HEADER_OPERATOR.length));
        }
        else {
            key = val = lodash_1.default.trim(paramString);
        }
        if (key.length > 0) {
            result.set(key, val);
        }
    });
    return result;
}
exports.parseHeaderParams = parseHeaderParams;
function getMembers(allUsers) {
    return Object.keys(allUsers).reduce((acc, key) => {
        const role = key === "admins" ? "Admin" : "User";
        const parsedGroup = allUsers[key].map((id) => ({ id, role }));
        return [...acc, ...parsedGroup];
    }, []);
}
exports.getMembers = getMembers;
//# sourceMappingURL=utils.js.map