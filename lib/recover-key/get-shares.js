const { decryptData } = require("../crypto");

const getShares = (encryptedTrustData, privateKey) => {
  let shares = [];

  for (let i = 0; i < encryptedTrustData.length; i++) {
    if (encryptedTrustData[i].trustStatus === 1) {
      let decryptedData = decryptData(
        encryptedTrustData[i].trustData,
        privateKey
      );
      shares.push(decryptedData);
    }
  }

  return shares;
};

module.exports = { getShares };
