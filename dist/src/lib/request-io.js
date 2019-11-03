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
const request_1 = __importDefault(require("request"));
/**
 * Converts implementation-independant IO options to the concrete
 * options used by the `request` library.
 *
 * @param ioOptions Implementation independent IO options
 * @returns {request.Options} Corresponding `request` options
 */
function asRequestOptions(ioOptions) {
    const result = Object.assign({}, ioOptions);
    if (ioOptions.queryString !== undefined) {
        delete result.queryString;
        result.qs = ioOptions.queryString;
    }
    if (ioOptions.cookies !== undefined) {
        delete result.cookies;
        result.jar = request_1.default.jar(ioOptions.cookies);
    }
    return result;
}
/**
 * Send a GET request
 *
 * @param options
 */
function get(options) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            request_1.default.get(asRequestOptions(options), (error, response, body) => {
                if (error) {
                    return reject(error);
                }
                if (response.statusCode === undefined) {
                    return reject(new Error("Missing status code"));
                }
                const ioResponse = {
                    statusCode: response.statusCode,
                    body,
                    headers: response.headers,
                };
                resolve(ioResponse);
            });
        });
    });
}
exports.get = get;
/**
 * Send a POST request
 *
 * @param options
 */
function post(options) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            request_1.default.post(asRequestOptions(options), (error, response, body) => {
                if (error) {
                    return reject(error);
                }
                if (response.statusCode === undefined) {
                    return reject(new Error("Missing status code"));
                }
                const ioResponse = {
                    statusCode: response.statusCode,
                    body,
                    headers: response.headers,
                };
                resolve(ioResponse);
            });
        });
    });
}
exports.post = post;
/**
 * Send a PUT request
 *
 * @param options
 */
function put(options) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            request_1.default.put(asRequestOptions(options), (error, response, body) => {
                if (error) {
                    return reject(error);
                }
                if (response.statusCode === undefined) {
                    return reject(new Error("Missing status code"));
                }
                const ioResponse = {
                    statusCode: response.statusCode,
                    body,
                    headers: response.headers,
                };
                resolve(ioResponse);
            });
        });
    });
}
exports.put = put;
exports.requestIo = {
    get,
    post,
    put,
};
//# sourceMappingURL=request-io.js.map