const { createTrustedDevice } = require("./create-device");
const { generateKeyPair } = require("./generate-key-pair");
const { calculateSymmKey } = require("./symm-key");
const { generateSecretShares } = require("./secrets");
const { createTrustId, checkTrustId, collectTrustIds } = require("./trust-id");
const {
  createChangeTrustData,
  createTrustData,
  createRecoveryTrustData
} = require("./trust-data");

const {
  sendChangeTrustData,
  sendTrustData,
  sendRecoveryTrustData
} = require("./send-trust-data");

module.exports = {
  createTrustedDevice,
  generateKeyPair,
  calculateSymmKey,
  generateSecretShares,
  createTrustId,
  checkTrustId,
  collectTrustIds,
  createChangeTrustData,
  createTrustData,
  createRecoveryTrustData,
  sendChangeTrustData,
  sendTrustData,
  sendRecoveryTrustData
};
