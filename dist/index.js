"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
require("./config/database");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
const routes_1 = __importDefault(require("./routes"));
// create application/json parser
const jsonParser = body_parser_1.default.json();
// create application/x-www-form-urlencoded parser
const urlencodedParser = body_parser_1.default.urlencoded({ extended: false });
app.use(jsonParser, (req, res, next) => {
    res.setHeader("content-type", "application/json");
    next();
});
app.use(routes_1.default);
app.listen(port, () => console.log(`[server]: server is running at :${port}`));
//# sourceMappingURL=index.js.map