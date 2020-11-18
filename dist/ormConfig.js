"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
var User_1 = __importDefault(require("./entities/User"));
var Music_1 = __importDefault(require("./entities/Music"));
dotenv_1.default.config();
var orm = {
    type: 'postgres',
    port: 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: 'artists',
    synchronize: true,
    logging: false,
    entities: [User_1.default, Music_1.default],
    host: 'localhost',
};
exports.default = orm;
