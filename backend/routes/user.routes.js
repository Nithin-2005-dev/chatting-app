import e from "express";
import {
  blockUser,
  getProfile,
  setOnline,
  unBlockUser,
  updateLastSeen,
  updateProfile,
} from "../controllers/user.controller.js";
export const userRouter = e.Router();
userRouter.get("/profile/:id", getProfile);
userRouter.put("/update/:id", updateProfile);
userRouter.post("/blockUser/:id", blockUser);
userRouter.post("/unBlockUser/:id", unBlockUser);
userRouter.put("/updateLastSeen/:id", updateLastSeen);
userRouter.put("/setOnline/:id", setOnline);