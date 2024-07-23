import { HardhatUserConfig, vars } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "./tasks/accounts";

const PRIVATE_KEY = vars.get('PRIVATE_KEY')
const INFURA_API_KEY = vars.get('INFURA_API_KEY')

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 1337,
    },
    // fork mainnet
    // hardhat: {
    //   // chainId: 1337,
    //   forking: {
    //     url: `https://mainnet.infura.io/v3/${INFURA_API_KEY}`,
    //     // blockNumber: 17000000,
    //   },
    // },
    // 本地 测试网
    localhost: {
      url: "http://localhost:8545",
    },
    // sepolia 测试网
    sepolia: {
      url: `https://sepolia.infura.io/v3/${INFURA_API_KEY}`,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
    },
    // 主网
    mainnet: {
      url: `https://mainnet.infura.io/v3/${INFURA_API_KEY}`,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
    }
  },
};

export default config;
