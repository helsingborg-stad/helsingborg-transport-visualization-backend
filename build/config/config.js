"use strict";
exports.__esModule = true;
exports.config = void 0;
exports.config = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
    token: process.env.TOKEN,
    frontendUrl: process.env.FRONTEND_URL,
    dbConnectionName: process.env.DB_CONNECTION_NAME
};
//# sourceMappingURL=config.js.map