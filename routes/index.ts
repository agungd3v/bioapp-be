import express from "express";
import UserController from "../controllers/user.controller";
import AuthController from "../controllers/auth.controller";
import middleware from "../middleware";
import { group } from "./group";

const router = express.Router();

router.use("/api", group((router) => {
  // router without middleware auth
  router.get("/", (req, res) => res.status(200).json({message: "application is ready!"}));
  router.post("/auth/register", AuthController.register);
  router.post("/auth/login", AuthController.login);

  // router with middleware auth
  router.use(middleware);
  router.get("/user", UserController.index);
  router.put("/user", UserController.update);
}));


export default router;