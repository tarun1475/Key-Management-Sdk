const { createHash } = require("../crypto");

const createTrustId = (userPublicKeyHash, devicePublicKey) => {
  /* This hash helps verify that the user is adding the correct trusted device
  (& not any random device) publicKey when the user is coming for recovery.
   */
  return createHash(userPublicKeyHash + devicePublicKey);
};

const collectTrustIds = recoveryDevices => {
  let arr = [];
  for (let i in recoveryDevices) {
    arr.push(recoveryDevices[i].trustId);
  }

  return arr;
};

module.exports = { createTrustId, collectTrustIds };
