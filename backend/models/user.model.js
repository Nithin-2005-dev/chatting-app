import mongoose from "mongoose";
//userName,password,email,fullName,profilePicture,lastSeen,isVerified,blockedUsers
const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "User name is required"],
      unique: [true, "User name should be unique"],
      validate: {
        validator: function (value) {
          return /^[a-z]+$/.test(value);
        },
        message:
          "User name should only contain lowercase letters with no special characters or spaces.",
      },
      trim: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      unique: [true, "Email should be unique"],
      validate: {
        validator: function (value) {
          const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return regex.test(value);
        },
        message: "Please provide a valid email address",
      },
    },
    fullName: {
      type: String,
      trim: true,
      default: null,
    },
    profilePicture: {
      type: String,
      default: null,
    },
    lastSeen: {
      type: Date,
      default: null,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    blockedUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);
export const User = mongoose.models.User || mongoose.model("User", userSchema);
