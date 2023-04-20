"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
var swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
var apiDocs = (0, swagger_jsdoc_1["default"])({
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'API',
            version: '1.0.0'
        }
    },
    apis: ['./swagger/*.{json,yml}', './build/domains/**/*.{js,ts}']
});
exports["default"] = (function (app) {
    app.use('/api-docs', swagger_ui_express_1["default"].serve, swagger_ui_express_1["default"].setup(apiDocs, { explorer: true }));
});
//# sourceMappingURL=index.js.map