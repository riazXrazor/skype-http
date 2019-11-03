"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const errors = __importStar(require("./errors/index"));
exports.errors = errors;
const events = __importStar(require("./interfaces/api/events"));
exports.events = events;
const resources = __importStar(require("./interfaces/api/resources"));
exports.resources = resources;
const nativeContact = __importStar(require("./interfaces/native-api/contact"));
const nativeConversation = __importStar(require("./interfaces/native-api/conversation"));
const nativeEvents = __importStar(require("./interfaces/native-api/events"));
const nativeMessageResources = __importStar(require("./interfaces/native-api/message-resources"));
const nativeResources = __importStar(require("./interfaces/native-api/resources"));
var connect_1 = require("./connect");
exports.connect = connect_1.connect;
var native;
(function (native) {
    native.contact = nativeContact;
    native.conversation = nativeConversation;
    native.resources = nativeResources;
    native.events = nativeEvents;
    native.messageResources = nativeMessageResources;
})(native || (native = {}));
//# sourceMappingURL=index.js.map