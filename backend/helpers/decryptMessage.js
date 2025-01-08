import { decrypt, readMessage, readPrivateKey } from "openpgp";

export const decryptMessage = async (encryptedMessage, receiverPrivateKey) => {
  try {
    console.log(encryptedMessage);
    const message = await readMessage({ armoredMessage: encryptedMessage });

    const privateKey = await readPrivateKey({ armoredKey: receiverPrivateKey });

    const { data: decrypted } = await decrypt({
      message,
      decryptionKeys: privateKey,
    });

    return decrypted;
  } catch (err) {
    throw new Error(`Decryption failed: ${err.message}`);
  }
};
