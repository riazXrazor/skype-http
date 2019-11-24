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
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = __importDefault(require("events"));
const accept_contact_request_1 = require("./api/accept-contact-request");
const add_member_1 = require("./api/add-member");
const create_conversation_1 = require("./api/create-conversation");
const decline_contact_request_1 = require("./api/decline-contact-request");
const get_contact_1 = require("./api/get-contact");
const get_conversation_1 = require("./api/get-conversation");
const get_conversations_1 = require("./api/get-conversations");
const get_join_url_1 = require("./api/get-join-url");
const get_messages_1 = require("./api/get-messages");
const send_file_1 = require("./api/send-file");
const send_image_1 = require("./api/send-image");
const send_message_1 = require("./api/send-message");
const set_conversation_topic_1 = require("./api/set-conversation-topic");
const set_status_1 = require("./api/set-status");
const contacts_1 = require("./contacts/contacts");
const context_1 = require("./interfaces/api/context");
const messages_poller_1 = require("./polling/messages-poller");
class Api extends events_1.default.EventEmitter {
    constructor(context, io) {
        super();
        this.context = context;
        this.io = io;
        this.messagesPoller = new messages_poller_1.MessagesPoller(this.io, this.context);
        this.messagesPoller.on("error", (err) => this.emit("error", err));
        // tslint:disable-next-line:no-void-expression
        this.messagesPoller.on("event-message", (ev) => this.handlePollingEvent(ev));
        this.contactsService = new contacts_1.ContactsService(this.io);
    }
    acceptContactRequest(contactUsername) {
        return __awaiter(this, void 0, void 0, function* () {
            yield accept_contact_request_1.acceptContactRequest(this.io, this.context, contactUsername);
            return this;
        });
    }
    declineContactRequest(contactUsername) {
        return __awaiter(this, void 0, void 0, function* () {
            yield decline_contact_request_1.declineContactRequest(this.io, this.context, contactUsername);
            return this;
        });
    }
    getContactInvites() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.contactsService.getInvites(this.context);
        });
    }
    getContact(contactId) {
        return __awaiter(this, void 0, void 0, function* () {
            return get_contact_1.getContact(this.io, this.context, contactId);
        });
    }
    getContacts() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.contactsService.getContacts(this.context);
        });
    }
    getConversation(conversationId) {
        return __awaiter(this, void 0, void 0, function* () {
            return get_conversation_1.getConversation(this.io, this.context, conversationId);
        });
    }
    getConversations() {
        return __awaiter(this, void 0, void 0, function* () {
            return get_conversations_1.getConversations(this.io, this.context);
        });
    }
    getMessages(conversationId) {
        return __awaiter(this, void 0, void 0, function* () {
            return get_messages_1.getMessages(this.io, this.context, conversationId);
        });
    }
    sendMessage(message, conversationId) {
        return __awaiter(this, void 0, void 0, function* () {
            return send_message_1.sendMessage(this.io, this.context, message, conversationId);
        });
    }
    setConversationTopic(conversationId, topic) {
        return __awaiter(this, void 0, void 0, function* () {
            return set_conversation_topic_1.setConversationTopic(this.io, this.context, conversationId, topic);
        });
    }
    getJoinUrl(conversationId) {
        return __awaiter(this, void 0, void 0, function* () {
            return get_join_url_1.getJoinUrl(this.io, this.context, conversationId);
        });
    }
    addMemberToConversation(conversationId, memberId) {
        return __awaiter(this, void 0, void 0, function* () {
            return add_member_1.addMemberToConversation(this.io, this.context, conversationId, memberId);
        });
    }
    createConversation(allUsers) {
        return __awaiter(this, void 0, void 0, function* () {
            return create_conversation_1.createConversation(this.io, this.context, allUsers);
        });
    }
    sendImage(message, conversationId) {
        return __awaiter(this, void 0, void 0, function* () {
            return send_image_1.sendImage(this.io, this.context, message, conversationId);
        });
    }
    sendFile(message, conversationId) {
        return __awaiter(this, void 0, void 0, function* () {
            return send_file_1.sendFile(this.io, this.context, message, conversationId);
        });
    }
    getState() {
        return context_1.Context.toJson(this.context);
    }
    setStatus(status) {
        return __awaiter(this, void 0, void 0, function* () {
            return set_status_1.setStatus(this.io, this.context, status);
        });
    }
    /**
     * Start polling and emitting events
     */
    listen() {
        return __awaiter(this, void 0, void 0, function* () {
            this.messagesPoller.run();
            return Promise.resolve(this);
        });
    }
    /**
     * Stop polling and emitting events
     */
    stopListening() {
        return __awaiter(this, void 0, void 0, function* () {
            this.messagesPoller.stop();
            return Promise.resolve(this);
        });
    }
    handlePollingEvent(ev) {
        this.emit("event", ev);
        if (ev.resource === null) {
            return;
        }
        // Prevent infinite-loop (echo itself)
        if (ev.resource.from.username === this.context.username) {
            return;
        }
        if (ev.resource.type === "Text") {
            this.emit("Text", ev.resource);
        }
        else if (ev.resource.type === "RichText") {
            this.emit("RichText", ev.resource);
        }
    }
}
exports.Api = Api;
//# sourceMappingURL=api.js.map