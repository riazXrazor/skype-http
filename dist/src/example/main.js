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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const readline_1 = __importDefault(require("readline"));
const skypeHttp = __importStar(require("../lib/connect"));
const meta_js_1 = __importDefault(require("./meta.js"));
/**
 * Command line interface prompt for the user credentials
 */
function promptCredentials() {
    return __awaiter(this, void 0, void 0, function* () {
        const cliInterface = readline_1.default.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        const username = yield new Promise((resolve, reject) => {
            cliInterface.question("Username? ", resolve);
        });
        const password = yield new Promise((resolve, reject) => {
            cliInterface.question("Password? ", resolve);
        });
        const result = new Promise((resolve, reject) => {
            cliInterface.once("error", (err) => {
                reject(err);
            });
            cliInterface.once("close", () => {
                resolve({ username, password });
            });
        });
        cliInterface.close();
        return result;
    });
}
function runExample() {
    return __awaiter(this, void 0, void 0, function* () {
        const statePath = path_1.default.resolve(meta_js_1.default.dirname, "api-state.json");
        let api;
        try {
            const stateContent = fs_1.default.readFileSync(statePath).toString("utf8");
            const apiContext = JSON.parse(stateContent);
            api = yield skypeHttp.connect({ state: apiContext, verbose: true });
            yield api.getContacts(); // Try a request, to check that the state is correctly restored.
            console.log(`Restored state from ${statePath}`);
        }
        catch (err) {
            console.log("Unable to restore the state from file, performing login with credentials");
            const credentials = yield promptCredentials();
            api = yield skypeHttp.connect({ credentials, verbose: true });
        }
        const apiState = api.getState();
        fs_1.default.writeFileSync(statePath, JSON.stringify(apiState), "utf8");
        console.log(`Saved state in the file: ${statePath}`);
        // Log every event
        api.on("event", (ev) => {
            console.log(JSON.stringify(ev, null, 2));
        });
        // Log every error
        api.on("error", (err) => {
            console.error("An error was detected:");
            console.error(err);
        });
        // tslint:disable-next-line:typedef
        const onMessage = (resource) => {
            if (resource.from.username === api.context.username) {
                return;
            }
            console.log("Received text:");
            console.log(resource.content);
            const response = `Hi! You said "${resource.content}". skype-http works!`;
            console.log(`Responding to conversation ${resource.conversation}`);
            console.log(response);
            api.sendMessage({ textContent: response }, resource.conversation)
                .catch(console.error);
        };
        api.on("Text", onMessage);
        api.on("RichText", onMessage);
        const contacts = yield api.getContacts();
        console.log("Your contacts:");
        console.log(JSON.stringify(contacts, null, 2));
        console.log("Starting polling:");
        yield api.listen();
        yield api.setStatus("Online");
        console.log("Ready");
    });
}
runExample()
    .catch((err) => {
    console.error(err.stack);
    return process.exit(1);
});
//# sourceMappingURL=main.js.map