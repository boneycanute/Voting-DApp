require("@nomiclabs/hardhat-ethers");
require("dotenv").config();

const {PRIVATE_KEY , API_URL} = process.env;
module.exports = {
  solidity: "0.8.19",
  networks: {
    hardhat: {},
    sepolia: {
      url: API_URL,
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
};
