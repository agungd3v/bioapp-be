"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nedb_1 = __importDefault(require("nedb"));
const path_1 = __importDefault(require("path"));
const storage = path_1.default.dirname(__dirname) + "/storage/database.db";
const database = new nedb_1.default({ filename: storage, autoload: true, corruptAlertThreshold: 1 });
exports.default = database;
