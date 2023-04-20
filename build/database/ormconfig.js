"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
exports.__esModule = true;
var typeorm_1 = require("typeorm");
var allEntities = __importStar(require("@root/entities"));
var entities = Object.values(allEntities).filter(function (entity) { return entity; });
var getDbSource = function () {
    var DB_CONNECTION_NAME = process.env.DB_CONNECTION_NAME;
    switch (DB_CONNECTION_NAME) {
        case 'test':
            return {
                type: 'sqlite',
                database: './db.sql',
                keepConnectionAlive: true,
                entities: entities,
                migrations: ["".concat(__dirname, "/migrations/**/*{.ts,.js}")],
                cli: {
                    migrationsDir: 'src/database/migrations'
                }
            };
        case 'gcp':
            return {
                type: 'postgres',
                host: process.env.DB_HOST,
                port: process.env.DB_PORT,
                username: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME,
                keepConnectionAlive: true,
                entities: entities,
                migrations: ["".concat(__dirname, "/migrations/**/*{.ts,.js}")],
                migrationsRun: true,
                cli: {
                    migrationsDir: 'src/database/migrations'
                },
                extra: {
                    max: 10
                }
            };
        default:
            return {
                type: 'postgres',
                host: process.env.DB_HOST || 'localhost',
                // @ts-ignore
                port: process.env.DB_PORT,
                username: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME,
                keepConnectionAlive: true,
                entities: entities,
                migrations: ["".concat(__dirname, "/migrations/**/*{.ts,.js}")],
                cli: {
                    migrationsDir: 'src/database/migrations'
                }
            };
    }
};
exports["default"] = new typeorm_1.DataSource(getDbSource());
//# sourceMappingURL=ormconfig.js.map