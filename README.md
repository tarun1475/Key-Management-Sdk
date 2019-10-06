# Key Management SDK

Key Management SDK is a SSSS implementation for all non-custodial crypto wallet providers to integrate the functionality of key management/recovery with few lines of code. Currently the SDK supports wallets written in javascript but future implementations will support the following languages as well: Java (Android), Swift(iOS) & React Native.
The SDK can be plugged into your existing wallet and covers all the edge-cases involved with key recovery like trusted device (friends) collusion & making sure only user knows her trusted devices. Integrating the SDK also provides the wallet user with important features like seeing health of her trusted devices, adding/deleting trusted devices etc.

Introductory Blog Post : https://medium.com/coinsafeapp/introducing-coinsafe-never-lose-your-bitcoins-ever-cbf69bce9099

Key management architecture : https://medium.com/coinsafeapp/coinsafe-has-zero-knowledge-of-its-users-heres-how-abb102fe2f97

### How do I set it up?

git clone https://github.com/tarun1475/key-management-sdk

cd key-management-sdk

npm install

## Table of contents

- [Generate Key Pair](#generate-key-pair)
- [Calculate Symmetric Key](#calculate-symmetric-key)
- [Generate Secret Shares](#generate-secret-shares)
- [Create Trust Id](#create-trust-id)
- [Collect Trust Ids](#collect-trust-ids)
- [Create Trust Data](#create-trust-data)
- [Change Trust Data](#change-trust-data)
- [Create Recovery Trust Data](#create-recovery-trust-data)

---

## Generate Key Pair

GenerateKeyPair method is used to generate a wallet public private key pair from mnemonic. This key pair is used for end-to-end encrypted communication between a user and his trusted devices.

```js
const { generateKeyPair } = require("./");

const mnemonic =
  "eight fun pioneer decide provide twelve modify coin actual humble burden junk";

const keyPair = generateKeyPair(mnemonic);
```

## Calculate Symmetric Key

CalculateSymmetricKey method calculates the symmetric key which is used to encrypt the mnemonic to get an encrypted mnemonic in case the user has enabled 2FA using email. This symmetric key is mapped to user's wallet public key hash and stored in our database. Shamir secret sharing is applied on the encrypted mnemonic so in the case that user's trusted devices collude among themselves, they only get an encrypted version of the mnemonic & they would need to hack a user's email as well (& obtain subsequent symmetric key from us) to get back his original mnemonic.

```js
const { calculateSymmKey } = require("./");

const privateKey =
  "MC4CAQAwBQYDK2VwBCIEIL7O4gc9jNMp/82jZ4jErvFevZ8xF0PfBbH+TqpjwVJn";

const symmKey = calculateSymmKey(privateKey);
```

## Generate Secret Shares

GenerateSecretShares method is used to generate shares of the encrypted mnemonic according to the given (k,n) threshold for SSSS.

```js
const { generateSecretShares, calculateSymmKey } = require("./");

const mnemonic =
  "eight fun pioneer decide provide twelve modify coin actual humble burden junk";
const maxDevices = 5,
  minDevices = 3;
const privateKey =
  "MC4CAQAwBQYDK2VwBCIEIL7O4gc9jNMp/82jZ4jErvFevZ8xF0PfBbH+TqpjwVJn";

const symmKey = calculateSymmKey(privateKey);

const shares = generateSecretShares(mnemonic, symmkey, maxDevices, minDevices);
```

## Create Trust Id

CreateTrustId is used to assign a trustId for the relationship between a user and her trusted device. This trustId is created on user's front-end by hashing the hash of the wallet public key of the user & wallet public key of her trusted device. The trustId is used when user wants to change the relationship between herself and the trusted device, for example : deleting the trusted device.

```js
const { createTrustId } = require("./");

const userPublicKeyHash =
  "f7d495ee2b50bff097ab54dc3d698b63a5d257bdd7d207c9e308b62074f466d6";
const devicePublicKey =
  "MCowBQYDK2VwAyEACqvrKA8StPxbWK+20XoZNL8QcaSXe85eJop7IngTb3U=";

const trustId = createTrustId(userPublicKeyHash, devicePublicKey);
```

## Collect Trust Ids

CollectTrustIds returns an array of all trustIds that are related to a user.

```js
const { collectTrustIds } = require("./");

let recoveryDevices = [
  {
    address: "MCowBQYDK2VwAyEACqvrKA8StPxbWK+20XoZNL8QcaSXe85eJop7IngTb3U=",
    trustId: "d746c49e2100a4ec18404200384ee468bd71b0348c660715c427c7d3f7e377f9"
  },
  {
    address: "MCowBQYDK2VwAyEAzkeMhcmkgYJ93wVswnQWDI4BHeopskGpvJYobDyp4gk=",
    trustId: "bb0666df8b62f0b408a8d4b32ad40fd6abbbcdfb8e0e6ecff7dab919c0d42385"
  },
  {
    address: "MCowBQYDK2VwAyEAdfv/iozvpSkK4Ve0zyOVYISdmgB/T+yT4j/TDbogJDQ=",
    trustId: "7ff8a3eff9c23428f0931662411e983cf2ece8cf28e597b68a4dd6a3c179f66c"
  }
];

const getTrustIds = collectTrustIds(recoveryDevices);
```

## Create Trust Data

CreateTrustData method asymmetrically encrypts the generated shares over the wallet public keys of the trusted devices.

```js
const { createTrustData } = require("./");

let devices = [
  {
    address: "MCowBQYDK2VwAyEACqvrKA8StPxbWK+20XoZNL8QcaSXe85eJop7IngTb3U="
  },
  {
    address: "MCowBQYDK2VwAyEAzkeMhcmkgYJ93wVswnQWDI4BHeopskGpvJYobDyp4gk="
  },
  {
    address: "MCowBQYDK2VwAyEAw1Mk2PNhwM2rWuqGHTQI/nJ5mVzl+oEms3tDIdW7aac="
  }
];

const mnemonic =
  "eight fun pioneer decide provide twelve modify coin actual humble burden junk";

const publicKey =
  "MCowBQYDK2VwAyEARiOlX2c8568hFs7MqiqAXKMTXr+W6yx80ZFm4SsHFMA=";

const privateKey =
  "MC4CAQAwBQYDK2VwBCIEIL7O4gc9jNMp/82jZ4jErvFevZ8xF0PfBbH+TqpjwVJn";

const maxDevices = 3,
  minDevices = 2;

const trustData = createTrustData(
  devices,
  mnemonic,
  publicKey,
  privateKey,
  maxDevices,
  minDevices
);
```

## Change Trust Data

ChangeTrustData method allows the user to change his SSSS (k,n) threshold scheme as well as add/delete trusted devices.

```js
const { createChangeTrustData } = require("./");

let devices = [
  {
    address: "MCowBQYDK2VwAyEACqvrKA8StPxbWK+20XoZNL8QcaSXe85eJop7IngTb3U="
  },
  {
    address: "MCowBQYDK2VwAyEAzkeMhcmkgYJ93wVswnQWDI4BHeopskGpvJYobDyp4gk="
  },
  {
    address: "MCowBQYDK2VwAyEAw1Mk2PNhwM2rWuqGHTQI/nJ5mVzl+oEms3tDIdW7aac="
  }
];

let recoveryDevices = [
  {
    address: "MCowBQYDK2VwAyEACqvrKA8StPxbWK+20XoZNL8QcaSXe85eJop7IngTb3U=",
    trustId: "d746c49e2100a4ec18404200384ee468bd71b0348c660715c427c7d3f7e377f9"
  },
  {
    address: "MCowBQYDK2VwAyEAzkeMhcmkgYJ93wVswnQWDI4BHeopskGpvJYobDyp4gk=",
    trustId: "bb0666df8b62f0b408a8d4b32ad40fd6abbbcdfb8e0e6ecff7dab919c0d42385"
  },
  {
    address: "MCowBQYDK2VwAyEAdfv/iozvpSkK4Ve0zyOVYISdmgB/T+yT4j/TDbogJDQ=",
    trustId: "7ff8a3eff9c23428f0931662411e983cf2ece8cf28e597b68a4dd6a3c179f66c"
  }
];

const publicKey =
  "MCowBQYDK2VwAyEARiOlX2c8568hFs7MqiqAXKMTXr+W6yx80ZFm4SsHFMA=";

const privateKey =
  "MC4CAQAwBQYDK2VwBCIEIL7O4gc9jNMp/82jZ4jErvFevZ8xF0PfBbH+TqpjwVJn";

const mnemonic =
  "eight fun pioneer decide provide twelve modify coin actual humble burden junk";

const maxDevices = 5,
  minDevices = 3;

const changeTrustData = createChangeTrustData(
  devices,
  recoveryDevices,
  mnemonic,
  publicKey,
  privateKey,
  maxDevices,
  minDevices
);
```

## Create Recovery Trust Data

CreateRecoveryTrustData method is used to create recovery data by the user when he is coming for fund recovery on our system. The user asymmetrically encrypts & sends his new wallet public key on trusted devices' public keys so that the trusted devices can encrypt and send the secret data on this new wallet public key. Since, the user had lost access to his mnemonic (& corresponding public-private key pair), he needs to create a new wallet public private key pair for end to end encryption and share that with her trusted devices.

```js
const { createRecoveryTrustData } = require("./");

let devices = [
  {
    address: "MCowBQYDK2VwAyEACqvrKA8StPxbWK+20XoZNL8QcaSXe85eJop7IngTb3U="
  },
  {
    address: "MCowBQYDK2VwAyEAzkeMhcmkgYJ93wVswnQWDI4BHeopskGpvJYobDyp4gk="
  },
  {
    address: "MCowBQYDK2VwAyEAw1Mk2PNhwM2rWuqGHTQI/nJ5mVzl+oEms3tDIdW7aac="
  }
];

const publicKey =
  "MCowBQYDK2VwAyEARiOlX2c8568hFs7MqiqAXKMTXr+W6yx80ZFm4SsHFMA=";

const recoveryTrustData = createRecoveryTrustData(devices, publicKey);
```

### Core Contributors

- ([Tarun Gupta](https://github.com/tarun1475))
- ([Arnav Vohra](https://github.com/arnavvohra))
