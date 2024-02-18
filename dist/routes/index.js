"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
const middleware_1 = __importDefault(require("../middleware"));
const group_1 = require("./group");
const router = express_1.default.Router();
router.use("/api", (0, group_1.group)((router) => {
    // router without middleware auth
    router.get("/", (req, res) => res.status(200).json({ message: "application is ready!" }));
    router.post("/auth/register", auth_controller_1.default.register);
    router.post("/auth/login", auth_controller_1.default.login);
    // router with middleware auth
    router.use(middleware_1.default);
    router.get("/user", user_controller_1.default.index);
    router.put("/user", user_controller_1.default.update);
}));
exports.default = router;
