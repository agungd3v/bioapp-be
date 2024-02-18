"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.group = void 0;
const express_1 = __importDefault(require("express"));
exports.group = ((callback) => {
    const router = express_1.default.Router();
    callback(router);
    return router;
});
