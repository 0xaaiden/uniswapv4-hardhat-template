import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.24", // Align with the template's Solidity version
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    // ...add your desired networks (e.g., localhost, Goerli)
    goerli: {
      url: "https://rpc.ankr.com/eth_goerli", // Or your preferred Goerli RPC
      // accounts: [""], // Replace with your private key
    },
    hardhat: {

    }
  },
  ignition: {
    strategyConfig: {
      create2: {
        // To learn more about salts, see the CreateX documentation
        salt: "0x0000000000000000000000000000000000000000000000000000000000000000",
      },
    },
  },
  etherscan: {
    apiKey: "YOUR_ETHERSCAN_API_KEY" // Replace with your Etherscan API key
  },
};

export default config;