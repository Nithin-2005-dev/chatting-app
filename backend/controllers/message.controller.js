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
      sender.publicKey
    );
    const encryptedMessageSender = await encryptMessage(
      message,
      receiver.publicKey
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
    const { privateKey,receiver} = req.body;
    if (!privateKey) {
      return res.status(403).json({
        success: false,
        message: "you are not allow to see messages",
      });
    }
    if (!req.params.id) {
      return res.status(400).json({
        success: false,
        message: "sender id required",
      });
    }
    const messages = await Message.find({
      $or: [{$or:[{sender:req.params.id,receiver}]},{$or:[{sender:receiver,receiver:req.params.id}]}]})
    if (messages.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Messages not found",
      });
    }
    const allMessages = [];
    for (const message of messages) {
      let decryptedMessage;
      try{
      decryptedMessage = await decryptMessage(
        message.messageReceiver,
        privateKey
      );
    }catch(err){

    }
    try{
      decryptedMessage = await decryptMessage(
        message.messageSender,
        privateKey
      );
    }catch(err){

    }
      if (!decryptedMessage) {
        return res.status(500).json({
          success: false,
          message: "Message decryption failed",
        });
      }

      allMessages.push({
        message: decryptedMessage,
        time: message.createdAt,
        id: message._id,
        status:message.status,
        sender:message.sender,
        receiver:message.receiver
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
export const updateStatus = async (req, res) => {
  try {
    const updatedMessage = await Message.findByIdAndUpdate(
      req.params.id,
      { status: req.query.status },
      { new: true }
    );
    if (!updatedMessage) {
      return res.status(404).json({
        success: false,
        message: "message not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "status updated",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong! Please try again.",
      err: err.message,
    });
  }
};
