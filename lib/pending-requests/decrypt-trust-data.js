const { decryptData } = require("../crypto");
const { checkValidRequests } = require("./check-valid-requests");

const decryptTrustData = (trustData, recoveryData, privateKey, publicKey) => {
  var decryptedTrustData = [];

  for (let i = 0; i < trustData.length; i++) {
    decryptedTrustData[i] = decryptData(trustData[i].trust_data, privateKey);
  }

  let decryptedRecoveryData = [];

  for (let i = 0; i < recoveryData.length; i++) {
    let decryptedRecoveryDataObj = {};

    decryptedRecoveryDataObj.requestId = recoveryData[i].requestId;
    decryptedRecoveryDataObj.username = recoveryData[i].username;

    decryptedRecoveryDataObj.fromPublicKeyHash =
      recoveryData[i].fromPublicKeyHash;

    decryptedRecoveryDataObj.newPublicKeyHash =
      recoveryData[i].newPublicKeyHash;

    decryptedRecoveryDataObj.newPublicKey = decryptData(
      recoveryData[i].publicKeyData,
      account.privateKey
    ).newPublicKey;

    decryptedRecoveryData.push(decryptedRecoveryDataObj);
  }

  checkValidRequests(decryptedTrustData, decryptedRecoveryData, publicKey);
};

module.exports = { decryptTrustData };
