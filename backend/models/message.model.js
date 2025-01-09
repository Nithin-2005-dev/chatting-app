import mongoose from "mongoose";
const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["sent", "delivered", "seen"], // Correct way to define enums
      default: "sent",
    },
    messageSender: {
      type: String,
      required: [true, "message content is required"],
    },
    messageReceiver: {
      type: String,
      required: [true, "message content is required"],
    },
  },
  { timestamps: true }
);
export const Message =
  mongoose.models.Message || mongoose.model("Message", messageSchema);
