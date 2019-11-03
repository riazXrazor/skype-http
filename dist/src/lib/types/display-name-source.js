"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const case_style_1 = require("kryo/case-style");
const ts_enum_1 = require("kryo/types/ts-enum");
var DisplayNameSource;
(function (DisplayNameSource) {
    DisplayNameSource[DisplayNameSource["Identifier"] = 0] = "Identifier";
    DisplayNameSource[DisplayNameSource["Profile"] = 1] = "Profile";
    /**
     * The display name was edited by the current user.
     */
    DisplayNameSource[DisplayNameSource["UserEdits"] = 2] = "UserEdits";
})(DisplayNameSource = exports.DisplayNameSource || (exports.DisplayNameSource = {}));
exports.$DisplayNameSource = new ts_enum_1.TsEnumType({
    enum: DisplayNameSource,
    rename: case_style_1.CaseStyle.SnakeCase,
});
//# sourceMappingURL=display-name-source.js.map