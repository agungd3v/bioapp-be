"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = void 0;
const crypto_1 = require("./utils/crypto");
const middleware = (req, res, next) => {
    var _a;
    try {
        const token = req.header("Authorization");
        if (!token)
            return res.status(401).json({ status: 401, message: "akses ditolak" });
        const getToken = (_a = token.split("Bearer ")[1]) !== null && _a !== void 0 ? _a : "";
        const user = (0, crypto_1.verify)(getToken);
        global.user = user;
        next();
    }
    catch (error) {
        console.log(error.toString());
        return res.status(400).json({ status: 400, message: "token kadaluwarsa" });
    }
};
const getUser = (user) => user;
exports.getUser = getUser;
exports.default = middleware;
