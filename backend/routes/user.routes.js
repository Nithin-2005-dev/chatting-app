import e from "express";
import {
  addFriend,
  blockUser,
  getProfile,
  setOnline,
  unBlockUser,
  updateLastSeen,
  updateProfile,
} from "../controllers/user.controller.js";
export const userRouter = e.Router();
userRouter.post("/profile/:id", getProfile);
userRouter.put("/update/:id", updateProfile);
userRouter.put("/blockUser/:id", blockUser);
userRouter.put("/unBlockUser/:id", unBlockUser);
userRouter.put("/addFriend/:id", addFriend);
userRouter.put("/updateLastSeen/:id", updateLastSeen);
userRouter.put("/setOnline/:id", setOnline);