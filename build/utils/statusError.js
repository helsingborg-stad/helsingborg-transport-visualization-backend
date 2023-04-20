"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var StatusError = /** @class */ (function (_super) {
    __extends(StatusError, _super);
    /**
     * Creates a new instance of the error
     * @param statusCode {number}
     * @param message {string}
     */
    function StatusError(statusCode, message) {
        var _this = _super.call(this, message) || this;
        Error.captureStackTrace(_this, _this.constructor);
        _this.name = _this.constructor.name;
        _this.statusCode = statusCode || 400;
        return _this;
    }
    return StatusError;
}(Error));
exports["default"] = StatusError;
//# sourceMappingURL=statusError.js.map