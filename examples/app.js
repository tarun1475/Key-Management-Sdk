const {
  createTrustData,
  createChangeTrustData,
  generateKeyPair,
  createRecoveryTrustData,
  calculateSymmKey,
  createHash
} = require("../");

// { privateKey:
//    'MC4CAQAwBQYDK2VwBCIEIL7O4gc9jNMp/82jZ4jErvFevZ8xF0PfBbH+TqpjwVJn',
//   publicKey:
//    'MCowBQYDK2VwAyEARiOlX2c8568hFs7MqiqAXKMTXr+W6yx80ZFm4SsHFMA=' }
//
// mnemonic:eight fun pioneer decide provide twelve modify coin actual humble burden junk
//

// { privateKey:
//    'MC4CAQAwBQYDK2VwBCIEIJJg6z4qqlO/y7xOEL/EI4+1VmEHS5J//6qyUENPg65T',
//   publicKey:
//    'MCowBQYDK2VwAyEACqvrKA8StPxbWK+20XoZNL8QcaSXe85eJop7IngTb3U=' }

// { privateKey:
//    'MC4CAQAwBQYDK2VwBCIEIN+jvMjirFV+4RotoGqQANepdQ1nrJxQYzcl4lLzfAOa',
//   publicKey:
//    'MCowBQYDK2VwAyEAzkeMhcmkgYJ93wVswnQWDI4BHeopskGpvJYobDyp4gk='

// { privateKey:
//    'MC4CAQAwBQYDK2VwBCIEIN/FYnhz5yrqd3Yn7tO1qzC8Y8NofpBvkto5r08RRnCF',
//   publicKey:
//    'MCowBQYDK2VwAyEAdfv/iozvpSkK4Ve0zyOVYISdmgB/T+yT4j/TDbogJDQ=' }

// MCowBQYDK2VwAyEAw1Mk2PNhwM2rWuqGHTQI/nJ5mVzl+oEms3tDIdW7aac=
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

// const symmKey = calculateSymmKey(privateKey);

console.log(createHash(publicKey));

// async () => {
//   const data = await createTrustData(
//     devices,
//     mnemonic,
//     publicKey,
//     privateKey,
//     3,
//     2
//   );

// console.log(createTrustData(devices, mnemonic, publicKey, privateKey, 3, 2));
// };

// console.log(createRecoveryTrustData(devices, publicKey));

// console.log(
//   createChangeTrustData(
//     devices,
//     recoveryDevices,
//     mnemonic,
//     publicKey,
//     privateKey,
//     3,
//     2
//   )
// );
