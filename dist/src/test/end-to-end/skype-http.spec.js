"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const SkypeHttp = require("../../lib/connect");
const test_config_1 = require("../test-config");
const mainAccount = test_config_1.testConfig.credentials;
describe.skip("SkypeHttp", function () {
    this.timeout(20000); // 20 seconds
    it("should connect to the main account trough authentication", function () {
        return __awaiter(this, void 0, void 0, function* () {
            return SkypeHttp.connect({ credentials: mainAccount, verbose: test_config_1.testConfig.verbose })
                .then((api) => {
                chai_1.assert.equal(api.context.username, mainAccount.username);
            });
        });
    });
});
//# sourceMappingURL=skype-http.spec.js.map