import express from "express";
import {
  changeUserPassword,
  forgotUserPassword,
  loginUser,
  registerUser,
} from "../controllers/auth.controller.js";
export const authRouter = express.Router();
authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.post("/changePassword/:id", changeUserPassword);
authRouter.post("/forgotPassword", forgotUserPassword);