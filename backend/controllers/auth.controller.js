import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { generateKeys } from "../helpers/generateKeys.js";
//Register user
export const registerUser = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    if (!userName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "required fields are missing.",
      });
    }
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    const user = await User.create({
      userName,
      email,
      password: hashedPassword,
    });
    if (user) {
      return res.status(201).json({
        success: true,
        message: "user created successfully.",
        user,
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong!Please try again.",
      err: err.message,
    });
  }
};
//login user
export const loginUser = async (req, res) => {
  try {
    const { email, password, userName } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "required fields are missing.",
      });
    }
    const user = await User.findOne({
      $or: [{ userName }, { email }],
    });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "user not found!please check username or email",
      });
    }
    const isPasswordCorrect = await bcryptjs.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "password incorrect",
      });
    }
    const keys = await generateKeys(user._id);
    if (!user.publicKey) {
      user.publicKey = keys.publicKey;
    }
    await user.save();
    const token = jwt.sign(
      { id: user._id, userName: user.userName },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "7d" }
    );
    res.status(200).json({
      success: true,
      message: "user logged in successfully.",
      token,
      privateKey: keys.privateKey,
      user: {
        id: user._id,
        userName: user.userName,
        email: user.email,
        fullName: user.fullName,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong!Please try again.",
      err: err.message,
    });
  }
};
//change password
export const changeUserPassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "required fields are missing.",
      });
    }
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "user not found!please check username or email",
      });
    }
    const isPasswordCorrect = await bcryptjs.compare(
      oldPassword,
      user.password
    );
    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "old password incorrect",
      });
    }
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save();
    res.status(200).json({
      success: true,
      message: "password changed!",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong!Please try again.",
      err: err.message,
    });
  }
};
//forgot password
export const forgotUserPassword = (req, res) => {
  try {
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong!Please try again.",
    });
  }
};
