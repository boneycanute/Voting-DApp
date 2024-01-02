require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-ethers");
require("dotenv").config();

const {PRIVATE_KEY} = process.env;
module.exports = {
  solidity: "0.8.19",
  networks: {
    hardhat: {},
    sepolia: {
      url: "https://sepolia.infura.io/v3/02bfd2c7b3f9488dbe57e2aca221a1bf",
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
};
