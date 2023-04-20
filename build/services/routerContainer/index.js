"use strict";
exports.__esModule = true;
var express_1 = require("express");
var RouterContainer = /** @class */ (function () {
    function RouterContainer() {
        this.router = (0, express_1.Router)();
        this.mountRoutes(this.router);
    }
    RouterContainer.prototype.getRouter = function () {
        return this.router;
    };
    return RouterContainer;
}());
exports["default"] = RouterContainer;
//# sourceMappingURL=index.js.map