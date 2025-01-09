import express from "express";
import {
  receiveMessage,
  sendMessage,
  updateStatus,
} from "../controllers/message.controller.js";
export const messageRouter = express.Router();
messageRouter.post("/send/:id", sendMessage);
messageRouter.get("/receive/:id", receiveMessage);
messageRouter.put("/status/:id", updateStatus);
