require("@nomicfoundation/hardhat-toolbox");

//** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  networks:{
    defaultNetwork: "sepolia",
  networks: {
    hardhat: {},
    sepolia: {
      url: "https://sepolia.infura.io/v3/02bfd2c7b3f9488dbe57e2aca221a1bf",
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
  }
};
