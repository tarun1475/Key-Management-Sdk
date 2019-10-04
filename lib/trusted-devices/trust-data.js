const { calculateSymmKey } = require("./symm-key");
const { generateSecretShares } = require("./secrets");
const { createTrustId, collectTrustIds } = require("./trust-id");
const { createHash, encryptData } = require("../crypto");

const createTrustData = (
  devices,
  mnemonic,
  publicKey,
  privateKey,
  maxDevices,
  minDevices
) => {
  const symmkey = calculateSymmKey(privateKey);
  const shares = generateSecretShares(
    mnemonic,
    symmkey,
    maxDevices,
    minDevices
  );

  let userPublicKeyHash = createHash(publicKey);
  let trustData = [];

  for (let i = 0; i < devices.length; i++) {
    let data = {};
    let friendsObj = {};

    data.userPublicKeyHash = createHash(devices[i].address);
    data.trustId = createTrustId(userPublicKeyHash, devices[i].address);
    devices[i].trustId = data.trustId;

    let messageToEncrypt = {};
    messageToEncrypt.userPublicKeyHash = userPublicKeyHash;
    messageToEncrypt.secret = shares[i];

    messageToEncrypt = JSON.stringify(messageToEncrypt);

    data.encryptedKeyData = encryptData(messageToEncrypt, devices[i].address);

    trustData.push(data);
  }
  let devicesData = encryptData(JSON.stringify(devices), publicKey);

  return {
    trustData: trustData,
    devicesData: devicesData,
    userPublicKeyHash: userPublicKeyHash,
    symmkey: symmkey
  };
};

const createChangeTrustData = (
  devices,
  recoveryDevices,
  mnemonic,
  publicKey,
  privateKey,
  maxDevices,
  minDevices
) => {
  const symmkey = calculateSymmKey(privateKey);
  const shares = generateSecretShares(
    mnemonic,
    symmkey,
    maxDevices,
    minDevices
  );

  let userPublicKeyHash = createHash(publicKey);
  let devicesObject = {};
  let trustData = [];
  for (let i = 0; i < devices.length; i++) {
    let data = {};
    data.userPublicKeyHash = createHash(devices[i].address);

    data.trustId = createTrustId(userPublicKeyHash, devices[i].address);
    devices[i].trustId = data.trustId;

    // collect key value pair from new devices array
    // Key : friends public Address & Value : trustId
    devicesObject[devices[i].address] = data.trustId;

    let messageToEncrypt = {};
    messageToEncrypt.userPublicKeyHash = userPublicKeyHash;
    messageToEncrypt.secret = shares[i];

    // stringify the message for encryption
    messageToEncrypt = JSON.stringify(messageToEncrypt);

    data.encryptedKeyData = encryptData(messageToEncrypt, devices[i].address);

    trustData.push(data);
  }
  let devicesData = encryptData(JSON.stringify(devices), publicKey);

  //check for if there is any change in trusted devices
  //collect trust id which are different in order to delete them in the db
  //solve in BIG O(N)

  let trustIdArr = [];
  let sameTrustIds = [];

  for (let i = 0; i < recoveryDevices.length; i++) {
    if (devicesObject[recoveryDevices[i].address] === undefined) {
      trustIdArr.push(recoveryDevices[i].trustId);
    }
  }

  if (trustIdArr.length === 0) {
    return {
      isDevicesChanged: 0,
      message: "Please add new trusted devices"
    };
  } else {
    let trustIdArr = collectTrustIds(recoveryDevices);

    return {
      trustData: trustData,
      devicesData: devicesData,
      trustIdArr: trustIdArr,
      userPublicKeyHash: userPublicKeyHash,
      symmkey: symmkey
    };
  }
};
const createRecoveryTrustData = (devices, newPublicKey) => {
  let trustData = [];
  for (let i = 0; i < devices.length; i++) {
    let dataObject = {};
    dataObject.userPublicKeyHash = createHash(devices[i].address);

    let messageToEncrypt = {};
    messageToEncrypt.newPublicKey = newPublicKey;
    messageToEncrypt = JSON.stringify(messageToEncrypt);
    dataObject.encryptedKeyData = encryptData(
      messageToEncrypt,
      devices[i].address
    );
    trustData.push(dataObject);
  }
  return trustData;
};

module.exports = {
  createTrustData,
  createChangeTrustData,
  createRecoveryTrustData
};
