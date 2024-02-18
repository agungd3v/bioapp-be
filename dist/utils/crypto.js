"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verify = exports.sign = exports.decrypt = exports.encrypt = void 0;
const crypto_js_1 = __importDefault(require("crypto-js"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const moment_1 = __importDefault(require("moment"));
const secret = process.env.SECRET_KEY || "";
const encrypt = (text) => {
    const cipherText = crypto_js_1.default.AES.encrypt(text, secret);
    return cipherText.toString();
};
exports.encrypt = encrypt;
const decrypt = (ecryptedText) => {
    const bytes = crypto_js_1.default.AES.decrypt(ecryptedText, secret);
    const text = bytes.toString(crypto_js_1.default.enc.Utf8);
    return text;
};
exports.decrypt = decrypt;
const sign = (userKey) => {
    const expired = (0, moment_1.default)().endOf("day").diff((0, moment_1.default)(), "s");
    const sign = jsonwebtoken_1.default.sign(userKey, secret, { expiresIn: expired });
    return { signature: sign, expired: expired };
};
exports.sign = sign;
const verify = (tokenString) => {
    const verify = jsonwebtoken_1.default.verify(tokenString, secret);
    return verify;
};
exports.verify = verify;
//# sourceMappingURL=crypto.js.map