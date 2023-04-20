"use strict";
exports.__esModule = true;
var winston_1 = require("winston");
var customFormat = winston_1.format.printf(function (info) { return "".concat(info.timestamp, " ").concat(info.level, ": ").concat(info.message); });
var logger = (0, winston_1.createLogger)({
    format: winston_1.format.combine(winston_1.format.colorize(), winston_1.format.timestamp(), winston_1.format.splat(), winston_1.format.simple(), customFormat),
    transports: [new winston_1.transports.Console()]
});
exports["default"] = logger;
//# sourceMappingURL=index.js.map