// check for valid data
// encrypt correct data on new user public key
const { checkValidRequests } = require("./check-valid-requests");
const { decryptTrustData } = require("./decrypt-trust-data");

module.exports = { checkValidRequests, decryptTrustData };
