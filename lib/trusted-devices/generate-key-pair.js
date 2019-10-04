const bip39 = require("bip39");
const VirgilCrypto = require("virgil-crypto");
const virgilCrypto = new VirgilCrypto.VirgilCrypto();

const generateKeyPair = mnemonic => {
  let keyPair = {};
  if (mnemonic != undefined) {
    const seed = bip39.mnemonicToSeedSync(mnemonic);
    keyPair = virgilCrypto.generateKeysFromKeyMaterial(seed);
  } else {
    keyPair = virgilCrypto.generateKeys();
  }

  const privateKey = virgilCrypto
    .exportPrivateKey(keyPair.privateKey)
    .toString("base64");
  const publicKey = virgilCrypto
    .exportPublicKey(keyPair.publicKey)
    .toString("base64");

  return {
    privateKey: privateKey,
    publicKey: publicKey
  };
};

module.exports = { generateKeyPair };
