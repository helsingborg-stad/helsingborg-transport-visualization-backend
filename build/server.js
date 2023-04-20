"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var http_1 = __importDefault(require("http"));
var logger_1 = __importDefault(require("./services/logger"));
var app_1 = __importDefault(require("./app"));
var config_1 = require("./config");
var port = config_1.config.port;
(0, app_1["default"])().then(function (app) {
    app.set('port', port);
    /**
     * Create HTTP server.
     */
    var server = http_1["default"].createServer(app);
    /**
     * Event listener for HTTP server "listening" event.
     */
    function onListening() {
        var address = server.address();
        var bind = typeof address === 'string' ? "pipe ".concat(address) : "port ".concat(address === null || address === void 0 ? void 0 : address.port);
        logger_1["default"].info("Listening on ".concat(bind));
    }
    /**
     * Listen on provided port, on all network interfaces.
     */
    server.listen(port);
    server.on('listening', onListening);
    // TODO Add proper error handling
    server.on('error', function (error) {
        logger_1["default"].error(error);
        throw Error;
    });
});
//# sourceMappingURL=server.js.map