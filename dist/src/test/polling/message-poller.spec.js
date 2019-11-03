"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const messagesUri = require("../../lib/messages-uri");
const messages_poller_1 = require("../../lib/polling/messages-poller");
describe("formatControlClearTypingResource", function () {
    const items = [
        {
            nativeResource: {
                id: "1483879804631",
                // tslint:disable-next-line:max-line-length
                ackrequired: "https://db5-client-s.gateway.messenger.live.com/v1/users/ME/conversations/ALL/messages/1483879804631/ack",
                originalarrivaltime: "2017-01-08T12:50:04.626Z",
                imdisplayname: "Bob",
                messagetype: "Control/ClearTyping",
                conversationLink: "https://db5-client-s.gateway.messenger.live.com/v1/users/ME/conversations/8:bob",
                composetime: "2017-01-08T12:50:04.626Z",
                isactive: true,
                from: "https://db5-client-s.gateway.messenger.live.com/v1/users/ME/contacts/8:bob",
                type: "Message",
                counterpartymessageid: "1483879804624",
                version: "1483879804631",
            },
            expectedFormattedResource: {
                type: "Control/ClearTyping",
                id: "1483879804631",
                composeTime: new Date("2017-01-08T12:50:04.626Z"),
                arrivalTime: new Date("2017-01-08T12:50:04.626Z"),
                from: messages_poller_1.parseContactId("8:bob"),
                // tslint:disable-next-line:max-line-length
                conversation: messagesUri.parseConversation("https://db5-client-s.gateway.messenger.live.com/v1/users/ME/conversations/8:bob").conversation,
                native: {
                    id: "1483879804631",
                    // tslint:disable-next-line:max-line-length
                    ackrequired: "https://db5-client-s.gateway.messenger.live.com/v1/users/ME/conversations/ALL/messages/1483879804631/ack",
                    originalarrivaltime: "2017-01-08T12:50:04.626Z",
                    imdisplayname: "Bob",
                    messagetype: "Control/ClearTyping",
                    conversationLink: "https://db5-client-s.gateway.messenger.live.com/v1/users/ME/conversations/8:bob",
                    composetime: "2017-01-08T12:50:04.626Z",
                    isactive: true,
                    from: "https://db5-client-s.gateway.messenger.live.com/v1/users/ME/contacts/8:bob",
                    type: "Message",
                    counterpartymessageid: "1483879804624",
                    version: "1483879804631",
                },
            },
        },
    ];
    for (const item of items) {
        it("should format a Control/ClearTyping Message resource", function () {
            // tslint:disable-next-line:max-line-length
            const actual = messages_poller_1.formatControlClearTypingResource(messages_poller_1.formatGenericMessageResource(item.nativeResource, item.nativeResource.messagetype), item.nativeResource);
            const expected = item.expectedFormattedResource;
            chai_1.assert.strictEqual(actual.type, expected.type);
            chai_1.assert.strictEqual(actual.id, expected.id);
            chai_1.assert.strictEqual(actual.composeTime.getTime(), expected.composeTime.getTime());
            chai_1.assert.strictEqual(actual.arrivalTime.getTime(), expected.arrivalTime.getTime());
            chai_1.assert.deepEqual(actual.from, expected.from);
            chai_1.assert.strictEqual(actual.conversation, expected.conversation);
            chai_1.assert.deepEqual(actual.native, expected.native);
        });
    }
});
describe("formatControlTypingResource", function () {
    const items = [
        {
            nativeResource: {
                id: "1483885996187",
                // tslint:disable-next-line:max-line-length
                ackrequired: "https://db5-client-s.gateway.messenger.live.com/v1/users/ME/conversations/ALL/messages/1483885996187/ack",
                originalarrivaltime: "2017-01-08T14:33:16.196Z",
                imdisplayname: "Bob",
                messagetype: "Control/Typing",
                conversationLink: "https://db5-client-s.gateway.messenger.live.com/v1/users/ME/conversations/8:bob",
                composetime: "2017-01-08T14:33:16.196Z",
                isactive: true,
                from: "https://db5-client-s.gateway.messenger.live.com/v1/users/ME/contacts/8:bob",
                type: "Message",
                counterpartymessageid: "1483885996189",
                version: "1483885996187",
            },
            expectedFormattedResource: {
                type: "Control/Typing",
                id: "1483885996187",
                composeTime: new Date("2017-01-08T14:33:16.196Z"),
                arrivalTime: new Date("2017-01-08T14:33:16.196Z"),
                from: messages_poller_1.parseContactId("8:bob"),
                // tslint:disable-next-line:max-line-length
                conversation: messagesUri.parseConversation("https://db5-client-s.gateway.messenger.live.com/v1/users/ME/conversations/8:bob").conversation,
                native: {
                    id: "1483885996187",
                    // tslint:disable-next-line:max-line-length
                    ackrequired: "https://db5-client-s.gateway.messenger.live.com/v1/users/ME/conversations/ALL/messages/1483885996187/ack",
                    originalarrivaltime: "2017-01-08T14:33:16.196Z",
                    imdisplayname: "Bob",
                    messagetype: "Control/Typing",
                    // tslint:disable-next-line:max-line-length
                    conversationLink: "https://db5-client-s.gateway.messenger.live.com/v1/users/ME/conversations/8:bob",
                    composetime: "2017-01-08T14:33:16.196Z",
                    isactive: true,
                    from: "https://db5-client-s.gateway.messenger.live.com/v1/users/ME/contacts/8:bob",
                    type: "Message",
                    counterpartymessageid: "1483885996189",
                    version: "1483885996187",
                },
            },
        },
    ];
    for (const item of items) {
        it("should format a Control/Typing Message resource", function () {
            // tslint:disable-next-line:max-line-length
            const actual = messages_poller_1.formatControlTypingResource(messages_poller_1.formatGenericMessageResource(item.nativeResource, item.nativeResource.messagetype), item.nativeResource);
            const expected = item.expectedFormattedResource;
            chai_1.assert.strictEqual(actual.type, expected.type);
            chai_1.assert.strictEqual(actual.id, expected.id);
            chai_1.assert.strictEqual(actual.composeTime.getTime(), expected.composeTime.getTime());
            chai_1.assert.strictEqual(actual.arrivalTime.getTime(), expected.arrivalTime.getTime());
            chai_1.assert.deepEqual(actual.from, expected.from);
            chai_1.assert.strictEqual(actual.conversation, expected.conversation);
            chai_1.assert.deepEqual(actual.native, expected.native);
        });
    }
});
describe.skip("TODO: Event/Call", function () {
    const example = {
        clientmessageid: "16930058130863214577",
        composetime: "2017-01-08T14:49:20.395Z",
        messagetype: "Event/Call",
        originalarrivaltime: "2017-01-08T14:49:20.395Z",
        type: "Message",
        version: "1483886960408",
        isactive: true,
        from: "https://db5-client-s.gateway.messenger.live.com/v1/users/ME/contacts/8:bob",
        id: "1483886960408",
        conversationLink: "https://db5-client-s.gateway.messenger.live.com/v1/users/ME/conversations/8:bob",
        counterpartymessageid: "1483886960402",
        imdisplayname: "Bob",
        // tslint:disable-next-line:max-line-length
        ackrequired: "https://db5-client-s.gateway.messenger.live.com/v1/users/ME/conversations/ALL/messages/1483886960408/ack",
        // tslint:disable-next-line:max-line-length
        content: "<partlist type=\"started\" alt=\"\">\n  <part identity=\"bob\">\n    <name>Bob</name>\n  </part>\n</partlist>",
        skypeguid: "2ff47f4b-5b79-4076-a1ae-d34d6d89b135",
    };
});
//# sourceMappingURL=message-poller.spec.js.map