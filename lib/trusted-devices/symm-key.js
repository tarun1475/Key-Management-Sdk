const VirgilCrypto = require("virgil-crypto");
const virgilCrypto = new VirgilCrypto.VirgilCrypto();
const secrets = require("secret-sharing.js");

const calculateSymmKey = privateKey => {
  privateKey = virgilCrypto.importPrivateKey(privateKey);

  // generate a highly random string
  let key = secrets.random(256);

  // generate a signature using user's private key
  return virgilCrypto.calculateSignature(key, privateKey).toString("base64");
};
module.exports = { calculateSymmKey };
