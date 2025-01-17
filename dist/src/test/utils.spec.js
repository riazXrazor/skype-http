"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const utils_1 = require("../lib/utils");
describe("parseHeaderParams", function () {
    const items = [
        {
            name: "1",
            // tslint:disable-next-line:max-line-length
            header: "registrationToken=U2lnbmF0dXJlOjI6Mjg6QVFRQUFBQU5XWDhuQVVDMjNTYkZnVm9wK01QRTtWZXJzaW9uOjY6MToxO0lzc3VlVGltZTo0OjE5OjUyNDc2NzQ1MjQ4NTM5Njc2MDM7RXAuSWRUeXBlOjc6MTo4O0VwLklkOjI6MTE6ZmFjZWJvdC5ib2I7RXAuRXBpZDo1OjM2OmJmOGZkODQ5LTQ4NDQtNDM3ZC05OTE5LTFmMTc0NGQxN2Y3ZDtFcC5Mb2dpblRpbWU6NzoxOjA7RXAuQXV0aFRpbWU6NDoxOTo1MjQ3Njc0NTI0ODUyNzE3NTg3O0VwLkF1dGhUeXBlOjc6MjoxNTtVc3IuTmV0TWFzazoxMToxOjI7VXNyLlhmckNudDo2OjE6MDtVc3IuUmRyY3RGbGc6MjowOjtVc3IuRXhwSWQ6OToxOjA7VXNyLkV4cElkTGFzdExvZzo0OjE6MDtVc2VyLkF0aEN0eHQ6MjoyNDQ6Q2xOcmVYQmxWRzlyWlc0TFptRmpaV0p2ZEM1aWIySUJBMVZwWXhReEx6RXZNREF3TVNBeE1qb3dNRG93TUNCQlRReE9iM1JUY0dWamFXWnBaV1FBQUFBQUFBQUFBQUFBQUFBQUFFQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUxabUZqWldKdmRDNWliMklBQUFBQUFBQUFBQUFIVG05VFkyOXlaUUFBQUFBRUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFRdG1ZV05sWW05MExtSnZZZ0FBQUFBPTs=; expires=1463340242; endpointId={bf8fd849-4844-437d-9919-1f1744d17f7d}",
            expected: new Map([
                // tslint:disable-next-line:max-line-length
                ["registrationToken", "U2lnbmF0dXJlOjI6Mjg6QVFRQUFBQU5XWDhuQVVDMjNTYkZnVm9wK01QRTtWZXJzaW9uOjY6MToxO0lzc3VlVGltZTo0OjE5OjUyNDc2NzQ1MjQ4NTM5Njc2MDM7RXAuSWRUeXBlOjc6MTo4O0VwLklkOjI6MTE6ZmFjZWJvdC5ib2I7RXAuRXBpZDo1OjM2OmJmOGZkODQ5LTQ4NDQtNDM3ZC05OTE5LTFmMTc0NGQxN2Y3ZDtFcC5Mb2dpblRpbWU6NzoxOjA7RXAuQXV0aFRpbWU6NDoxOTo1MjQ3Njc0NTI0ODUyNzE3NTg3O0VwLkF1dGhUeXBlOjc6MjoxNTtVc3IuTmV0TWFzazoxMToxOjI7VXNyLlhmckNudDo2OjE6MDtVc3IuUmRyY3RGbGc6MjowOjtVc3IuRXhwSWQ6OToxOjA7VXNyLkV4cElkTGFzdExvZzo0OjE6MDtVc2VyLkF0aEN0eHQ6MjoyNDQ6Q2xOcmVYQmxWRzlyWlc0TFptRmpaV0p2ZEM1aWIySUJBMVZwWXhReEx6RXZNREF3TVNBeE1qb3dNRG93TUNCQlRReE9iM1JUY0dWamFXWnBaV1FBQUFBQUFBQUFBQUFBQUFBQUFFQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUxabUZqWldKdmRDNWliMklBQUFBQUFBQUFBQUFIVG05VFkyOXlaUUFBQUFBRUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFRdG1ZV05sWW05MExtSnZZZ0FBQUFBPTs="],
                ["expires", "1463340242"],
                ["endpointId", "{bf8fd849-4844-437d-9919-1f1744d17f7d}"],
            ]),
        },
    ];
    for (const item of items) {
        it(`should parse the known header ${item.name}`, function () {
            const actual = utils_1.parseHeaderParams(item.header);
            chai_1.assert.deepEqual(actual, item.expected);
        });
    }
});
//# sourceMappingURL=utils.spec.js.map