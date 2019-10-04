const {
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
} = require("./lib/trusted-devices");

const { sendEmail, verifyOtp } = require("./lib/auth");

const {
  checkValidRequests,
  decryptTrustData
} = require("./lib/pending-requests");

const {
  createHash,
  Cryptr,
  encryptData,
  decryptData,
  encryptKey,
  decryptKey
} = require("./lib/crypto");

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
  sendRecoveryTrustData,
  sendEmail,
  verifyOtp,
  createHash,
  Cryptr,
  encryptData,
  decryptData,
  encryptKey,
  decryptKey,
  checkValidRequests,
  decryptTrustData
};
