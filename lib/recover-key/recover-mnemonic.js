const { Cryptr } = require("../crypto");
const bip39 = require("bip39");
const secrets = require("secret-sharing.js");

const recoverMnemonic = (shares, symmkey) => {
  const cryptr = new Cryptr(symmkey);
  let combineShares = secrets.combine(shares);
  let mnemonic = cryptr.decrypt(combineShares);

  if (bip39.validateMnemonic(mnemonic)) {
    return {
      mnemonic: mnemonic.split(" ", 12)
    };
  } else {
    return {
      message: "Sorry, Not a valid Mnemonic!",
      isValid: 0
    };
  }
};

module.exports = { recoverMnemonic };
