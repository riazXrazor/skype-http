"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const testResourcesRoot = path_1.default.join(__dirname, "test-resources");
function readTextTestResource(filePath) {
    return fs_1.default.readFileSync(path_1.default.resolve(testResourcesRoot, filePath), "utf8");
}
exports.readTextTestResource = readTextTestResource;
//# sourceMappingURL=test-resources.js.map