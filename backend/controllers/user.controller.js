import { User } from "../models/user.model.js";

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
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
    if(req.body.password){
        return res.status(403).json({
            success: false,
            message: "you are not allowed to update password.",
          });
    }
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body,{new:true});
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
