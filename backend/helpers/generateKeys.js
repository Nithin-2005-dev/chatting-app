import { generateKey } from "openpgp";
import { User } from "../models/user.model.js";
export const generateKeys = async (id) => {
  try {
    const user = User.findById(id);
    if (!user) {
      throw new Error("user not found");
    }
    const keys = await generateKey({
      userIDs: [{ name: user.userName, email: user.email }],
      curve: "ed25519",
    });
    return keys;
  } catch (err) {
    throw new Error(err.message);
  }
};
