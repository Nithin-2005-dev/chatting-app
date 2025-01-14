import { User } from "../models/user.model.js";

export const getProfile = async (req, res) => {
  try {
    const {userName}=req.body;
    let user;
    if(req.params.id!="false"){
    user = await User.findById(req.params.id);
    }else{
      user=await User.find({userName});
      user=user[0];
    }
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "user found",
      user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong!Please try again.",
      err: err.message,
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    if (req.body.password) {
      return res.status(403).json({
        success: false,
        message: "you are not allowed to update password.",
      });
    }
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "user profile updated",
      updatedUser,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong!Please try again.",
      err: err.message,
    });
  }
};
export const blockUser = async (req, res) => {
  try {
    const { targetUser } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) {
      return req.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    if (user.blockedUsers.includes(targetUser)) {
      return res.status(400).json({
        success: false,
        message: "User already blocked",
      });
    }
    user.blockedUsers.push(targetUser);
    await user.save();
    return res.status(200).json({
      success: true,
      message: "User blocked successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong!Please try again.",
      err: err.message,
    });
  }
};
export const addFriend = async (req, res) => {
  try {
    const { friendId } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) {
      return req.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    if (user.friends.includes(friendId)) {
      return res.status(400).json({
        success: false,
        message: "User already friend",
      });
    }
    user.friends.push(friendId);
    const friend=await User.findById(friendId);
    friend.friends.push(user._id);
    await friend.save()
    await user.save();
    return res.status(200).json({
      success: true,
      message:"friend added successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong!Please try again.",
      err: err.message,
    });
  }
};
export const unBlockUser = async (req, res) => {
  try {
    const { targetUser } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const index = user.blockedUsers.indexOf(targetUser);
    if (index === -1) {
      return res.status(400).json({
        success: false,
        message: "User is not blocked",
      });
    }
    user.blockedUsers.splice(index, 1);
    await user.save();
    return res.status(200).json({
      success: true,
      message: "User unblocked successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong!Please try again.",
      err: err.message,
    });
  }
};
export const updateLastSeen = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        lastSeen: new Date(),
      },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "last seen updated successfully!",
      lastSeen: updatedUser.lastSeen,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong!Please try again.",
      err: err.message,
    });
  }
};
export const setOnline = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        isOnline: req.query.isOnline,
      },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "online updated successfully!",
      isOnline: updatedUser.isOnline,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong!Please try again.",
      err: err.message,
    });
  }
};
