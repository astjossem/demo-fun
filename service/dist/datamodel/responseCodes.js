"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ResponseCodes;
(function (ResponseCodes) {
    ResponseCodes[ResponseCodes["Ok"] = 200] = "Ok";
    ResponseCodes[ResponseCodes["BadRequest"] = 400] = "BadRequest";
    ResponseCodes[ResponseCodes["Unauthorized"] = 401] = "Unauthorized";
    ResponseCodes[ResponseCodes["Forbidden"] = 403] = "Forbidden";
    ResponseCodes[ResponseCodes["NotFound"] = 404] = "NotFound";
    ResponseCodes[ResponseCodes["MethodNotAllowed"] = 405] = "MethodNotAllowed";
    ResponseCodes[ResponseCodes["ServerError"] = 500] = "ServerError";
    ResponseCodes[ResponseCodes["NotImplemented"] = 501] = "NotImplemented";
})(ResponseCodes = exports.ResponseCodes || (exports.ResponseCodes = {}));
//# sourceMappingURL=responseCodes.js.map