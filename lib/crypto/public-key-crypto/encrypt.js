const VirgilCrypto = require("virgil-crypto");
const virgilCrypto = new VirgilCrypto.VirgilCrypto();

const encryptData = (data, publicKey) => {
  publicKey = virgilCrypto.importPublicKey(publicKey);
  const encryptedDataStr = virgilCrypto.encrypt(data, publicKey);
  return encryptedDataStr.toString("base64");
};

module.exports = { encryptData };
