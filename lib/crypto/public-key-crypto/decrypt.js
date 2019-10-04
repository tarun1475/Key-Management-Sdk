const VirgilCrypto = require("virgil-crypto");
const virgilCrypto = new VirgilCrypto.VirgilCrypto();

const decryptData = (data, privateKey) => {
  privateKey = virgilCrypto.importPrivateKey(privateKey);
  const decryptedData = virgilCrypto.decrypt(data, privateKey);
  return JSON.parse(decryptedData.toString("utf8"));
};

module.exports = { decryptData };
