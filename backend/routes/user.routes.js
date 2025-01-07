import e from "express";
import { getProfile, updateProfile } from "../controllers/user.controller.js";
export const userRouter = e.Router();
userRouter.get("/profile/:id", getProfile);
userRouter.put("/update/:id", updateProfile);
