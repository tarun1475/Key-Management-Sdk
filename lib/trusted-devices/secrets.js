const { Cryptr } = require("../crypto");
const secrets = require("secret-sharing.js");

const generateSecretShares = (mnemonic, symmkey, maxDevices, minDevices) => {
  const cryptr = new Cryptr(symmkey);
  const encryptedString = cryptr.encrypt(mnemonic);
  return secrets.share(encryptedString, maxDevices, minDevices);
};

module.exports = { generateSecretShares };
