const { createHash, encryptData } = require("../crypto");

const checkValidRequests = (trustData, recoveryData, publicKey) => {
  // TODO: solve in BIG o(N) using hash map
  var requestList = [];
  for (let i in recoveryData) {
    for (let j in trustData) {
      if (
        trustData[j].userPublicKeyHash === recoveryData[i].fromPublicKeyHash
      ) {
        data = {};
        data.userPublicKeyHash = createHash(publicKey);
        data.username = recoveryData[i].username;
        data.fromPublicKeyHash = trustData[j].userPublicKeyHash;
        data.newPublicKey = recoveryData[i].newPublicKey;
        data.secret = encryptData(
          trustData[j].secret,
          recoveryData[i].newPublicKey
        );
        data.requestId = recoveryData[i].requestId;
        requestList.push(data);
      }
    }
  }

  return {
    requests: requestList
  };
};

module.exports = { checkValidRequests };
