"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("../utils/crypto");
const database_1 = __importDefault(require("../config/database"));
const AuthController = {
    register: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield req.body;
        // check username or email
        database_1.default.findOne({ $or: [{ email: data.email }, { username: data.username }] }, function (err, doc) {
            const document = Object.assign(Object.assign({}, data), { password: (0, crypto_1.encrypt)(data.password) });
            if (doc)
                return res.status(400).json({ status: 400, message: "username atau email sudah terdaftar" });
            database_1.default.insert(document, function (err, newDoc) {
                return res.status(err ? 400 : 200).json({
                    status: err ? 400 : 200,
                    message: err ? err : "register berhasil"
                });
            });
        });
    }),
    login: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield req.body;
        // check username or email
        database_1.default.findOne({ $or: [{ email: data.user }, { username: data.user }] }, function (err, doc) {
            if (!doc)
                return res.status(400).json({ status: 400, message: "username atau email tidak terdaftar" });
            if ((0, crypto_1.decrypt)(doc.password) === data.password) {
                const token = (0, crypto_1.sign)({ _id: doc._id });
                delete doc._id;
                delete doc.password;
                delete doc.userAgent;
                return res.status(200).json({ status: 200, message: "login berhasil", user: doc, token: token });
            }
            return res.status(400).json({ status: 400, message: "user password salah" });
        });
    })
};
exports.default = AuthController;
//# sourceMappingURL=auth.controller.js.map