"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var logger_1 = __importDefault(require("@services/logger"));
/**
 * Log requests in dev mode to console.
 * @param req {Request}
 * @param res {Response}
 * @param next {NextFunction}
 */
exports["default"] = (function (req, res, next) {
    var message = "".concat(req.method, " - ").concat(req.url);
    if (['POST', 'PUT', 'PATCH'].includes(req.method) && req.body) {
        message += "\nRequest body: \n ".concat(JSON.stringify(req.body, null, 4));
    }
    logger_1["default"].info(message);
    next();
});
//# sourceMappingURL=devRequestLogger.js.map