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
const login_1 = require("../lib/login");
const request_io_1 = require("../lib/request-io");
const test_config_1 = require("./test-config");
describe.skip("login", function () {
    describe("login", function () {
        return __awaiter(this, void 0, void 0, function* () {
            this.timeout(10 * 60 * 1000); // 10 minutes
            it("Should log into the main test account", function () {
                return __awaiter(this, void 0, void 0, function* () {
                    const options = {
                        credentials: test_config_1.testConfig.credentials,
                        io: request_io_1.requestIo,
                    };
                    const apiContext = yield login_1.login(options);
                    console.log(apiContext);
                });
            });
        });
    });
});
//# sourceMappingURL=login.spec.js.map