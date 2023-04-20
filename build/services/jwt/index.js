"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.decodeJWT = exports.createJWT = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var _config_1 = require("@config");
var expiresIn = '3h';
/**
 * Creates a JWT token out of given payload.
 * @param payload {Object}
 * @return {string}
 */
var createJWT = function (payload) { return jsonwebtoken_1["default"].sign(payload, _config_1.config.token, { expiresIn: expiresIn }); };
exports.createJWT = createJWT;
/**
 * Decodes a JWT token into the original object
 * @param token {string}
 * @return {Object}
 */
var decodeJWT = function (token) { return jsonwebtoken_1["default"].verify(token, _config_1.config.token); };
exports.decodeJWT = decodeJWT;
//# sourceMappingURL=index.js.map