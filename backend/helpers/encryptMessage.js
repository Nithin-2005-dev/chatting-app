import { createMessage, encrypt, readKey } from "openpgp";

export const encryptMessage = async (mess, recieverPrivateKey) => {
  try {
    const messageObj = await createMessage({ text: mess });
    const keys = await readKey({ armoredKey: recieverPrivateKey });
    const encrypted = await encrypt({
      message: messageObj,
      encryptionKeys: keys,
    });
    return encrypted;
  } catch (err) {
    throw new Error(`Encryption failed: ${err.message}`);
  }
};
