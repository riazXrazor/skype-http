"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const hmac_sha256_1 = require("../../lib/utils/hmac-sha256");
describe("int32ToLittleEndianHexString", function () {
    const items = [
        { int32: 0x0, expected: "00000000" },
        { int32: 0x1, expected: "01000000" },
        { int32: 0x10, expected: "10000000" },
        { int32: 0x100, expected: "00010000" },
        { int32: 0x1000, expected: "00100000" },
        { int32: 0x12345678, expected: "78563412" },
    ];
    for (const item of items) {
        it(`should return "${item.expected}" for ${item.int32} (0x${item.int32.toString(16)})`, function () {
            const actual = hmac_sha256_1.int32ToLittleEndianHexString(item.int32);
            chai_1.assert.equal(actual, item.expected);
        });
    }
});
describe("hmacSha256", function () {
    const items = [
        {
            input: "1462570297",
            id: "msmsgs@msnmsgr.com",
            key: "Q1P7W2E4J9R8U3S5",
            expected: "5ac181edee7f30db176aaef9a043bf8a",
        },
    ];
    for (const item of items) {
        it(`should return "${item.expected}" for ("${item.input}", "${item.id}", "${item.key}")`, function () {
            const inputBuffer = Buffer.from(item.input, "utf8");
            const idBuffer = Buffer.from(item.id, "utf8");
            const keyBuffer = Buffer.from(item.key, "utf8");
            const actual = hmac_sha256_1.hmacSha256(inputBuffer, idBuffer, keyBuffer);
            chai_1.assert.equal(actual, item.expected);
        });
    }
});
//# sourceMappingURL=hmac-sha256.spec.js.map