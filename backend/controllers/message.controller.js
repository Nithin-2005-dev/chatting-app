import {} from "openpgp";
import { generateKeys } from "../helpers/generateKeys.js";
import { encryptMessage } from "../helpers/encryptMessage.js";
import { Message } from "../models/message.model.js";
import { decryptMessage } from "../helpers/decryptMessage.js";
import { User } from "../models/user.model.js";
export const sendMessage = async (req, res) => {
  try {
    const { receiverId, message } = req.body;
    if (!receiverId || !message) {
      return res.status(404).json({
        success: false,
        message: "required fields missing",
      });
    }
    const receiver = await User.findById(receiverId);
    const sender = await User.findById(req.params.id);
    if (!receiver.publicKey || !sender.publicKey) {
      return res.status(401).json({
        success: false,
        message: "unauthorised user found",
      });
    }
    const encryptedMessageReciever = await encryptMessage(
      message,
      receiver.publicKey
    );
    const encryptedMessageSender = await encryptMessage(
      message,
      sender.publicKey
    );
    const newMessage = await Message.create({
      messageReceiver: encryptedMessageReciever,
      messageSender: encryptedMessageSender,
      sender: req.params.id,
      receiver,
    });
    res.status(200).json({
      success: true,
      message: "message sent successfully",
      message: newMessage,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong!Please try again.",
      err: err.message,
    });
  }
};
export const receiveMessage = async (req, res) => {
  try {
    const { privateKey } = req.body;
    if (!privateKey) {
      return res.status(502).json({
        success: false,
        message: "you are not allow to see messages",
      });
    }
    const messages = await Message.find({ receiver: req.params.id });
    if (messages.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Messages not found",
      });
    }
    const allMessages = [];
    for (const message of messages) {
      const decryptedMessage = await decryptMessage(
        message.messageReceiver,
        privateKey
      );

      if (!decryptedMessage) {
        return res.status(500).json({
          success: false,
          message: "Message decryption failed",
        });
      }

      allMessages.push({
        message: decryptedMessage,
        time: message.createdAt,
      });
    }

    res.status(200).json({
      success: true,
      message: "Messages decrypted successfully",
      allMessages,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong! Please try again.",
      err: err.message,
    });
  }
};
