"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../config/database"));
const helpers_1 = require("../utils/helpers");
const UserController = {
    index: (req, res) => {
        const user = global.user;
        database_1.default.findOne({ _id: user._id }, (err, doc) => {
            if (doc) {
                delete doc.password;
                delete doc.userAgent;
                delete doc._id;
            }
            return res.status(doc ? 200 : 400).json({
                status: doc ? 200 : 400,
                message: "success",
                data: doc ? doc : null
            });
        });
    },
    update: (req, res) => {
        const user = global.user;
        const requestData = req.body;
        database_1.default.findOne({ _id: user._id }, (err, doc) => {
            const horoscope = { horoscope: (0, helpers_1.findHoroscope)(requestData.birthday) };
            if (doc)
                return database_1.default.update({ _id: user._id }, { $set: Object.assign(Object.assign(Object.assign({}, doc), requestData), horoscope) }, {}, (err, numReplaced) => {
                    delete doc.password;
                    delete doc.userAgent;
                    delete doc._id;
                    database_1.default.loadDatabase();
                    return res.status(200).json({ status: 200, message: "success", data: Object.assign(Object.assign(Object.assign({}, doc), requestData), horoscope) });
                });
            return res.status(400).json({ status: 400, message: err });
        });
    }
};
exports.default = UserController;
