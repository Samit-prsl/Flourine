import { HardhatUserConfig } from "hardhat/config";
import * as dotenv from 'dotenv'
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-verify";


dotenv.config()
const Private_key = process.env.METAMASK_PRIVATE_KEY!
const config: HardhatUserConfig = {
  solidity: "0.8.19",
  networks:{
    sepolia :{
      url:"https://sepolia.infura.io/v3/60fbafe6718542359776897c4cfec070",
      accounts:[Private_key],
    }
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: process.env.ETHERSCAN_API_KEY
  },
  sourcify: {
    // Disabled by default
    // Doesn't need an API key
    enabled: true
  }
};

export default config;
