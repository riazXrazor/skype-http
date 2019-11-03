"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const incident_1 = require("incident");
const util_1 = __importDefault(require("util"));
var UnexpectedHttpStatusError;
(function (UnexpectedHttpStatusError) {
    UnexpectedHttpStatusError.name = "UnexpectedHttpStatus";
})(UnexpectedHttpStatusError = exports.UnexpectedHttpStatusError || (exports.UnexpectedHttpStatusError = {}));
(function (UnexpectedHttpStatusError) {
    function format({ expected, response, request }) {
        const msg = `Received response with the HTTP status code \`${response.statusCode}\``
            + ` but expected one of ${util_1.default.inspect(expected)}.`;
        if (request === undefined) {
            return `${msg} Response: ${util_1.default.inspect(response)}`;
        }
        else {
            return `${msg} Request: ${util_1.default.inspect(request)}, Response: ${util_1.default.inspect(response)}`;
        }
    }
    UnexpectedHttpStatusError.format = format;
    function create(response, expected, request) {
        return new incident_1.Incident(UnexpectedHttpStatusError.name, { response, expected, request }, format);
    }
    UnexpectedHttpStatusError.create = create;
})(UnexpectedHttpStatusError = exports.UnexpectedHttpStatusError || (exports.UnexpectedHttpStatusError = {}));
var MissingHeaderError;
(function (MissingHeaderError) {
    MissingHeaderError.name = "MissingHeader";
})(MissingHeaderError = exports.MissingHeaderError || (exports.MissingHeaderError = {}));
(function (MissingHeaderError) {
    function format({ headerName, response, request }) {
        const msg = `Received response with headers \`${util_1.default.inspect(response.headers)}\``
            + ` where the expected header ${util_1.default.inspect(headerName)} is missing.`;
        if (request === undefined) {
            return `${msg} Response: ${util_1.default.inspect(response)}`;
        }
        else {
            return `${msg} Request: ${util_1.default.inspect(request)}, Response: ${util_1.default.inspect(response)}`;
        }
    }
    MissingHeaderError.format = format;
    function create(response, headerName, request) {
        return new incident_1.Incident(MissingHeaderError.name, { response, headerName, request }, format);
    }
    MissingHeaderError.create = create;
})(MissingHeaderError = exports.MissingHeaderError || (exports.MissingHeaderError = {}));
var RequestError;
(function (RequestError) {
    RequestError.name = "Request";
})(RequestError = exports.RequestError || (exports.RequestError = {}));
(function (RequestError) {
    function format({ request }) {
        return `The following HTTP request failed: "${JSON.stringify(request)}"`;
    }
    RequestError.format = format;
    function create(cause, request) {
        return new incident_1.Incident(cause, RequestError.name, { request }, format);
    }
    RequestError.create = create;
})(RequestError = exports.RequestError || (exports.RequestError = {}));
//# sourceMappingURL=http.js.map