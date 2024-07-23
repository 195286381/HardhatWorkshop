import { HardhatUserConfig, vars } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "./tasks/accounts";

const PRIVATE_KEY = vars.get('PRIVATE_KEY')
const INFURA_API_KEY = vars.get('INFURA_API_KEY')

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  defaultNetwork: "hardhat",
  // defaultNetwork: "fork_mainnet",
  networks: {
    
    hardhat: {
      chainId: 1337,
      // warning: 注意设置gasPrice, 不然容易因为gas费用问题, 导致交易失败.
      gasPrice: 2000000000, // 20 Gwei
      initialBaseFeePerGas: 100000000 // 1 Gwei
    },

    // Warning: The configuration within this comment has a problem.
    // fork mainnet
    // fork_mainnet: {
    //   // chainId: 1337,
    //   forking: {
    //     url: `https://mainnet.infura.io/v3/${INFURA_API_KEY}`,
    //     // blockNumber: 17000000,
    //   },
    // },

    // localhost network
    localhost: {
      url: "http://localhost:8545",
    },

    // sepolia test network
    sepolia: {
      url: `https://sepolia.infura.io/v3/${INFURA_API_KEY}`,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
    },
    // mainnet network
    mainnet: {
      url: `https://mainnet.infura.io/v3/${INFURA_API_KEY}`,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
    }
  },
};

export default config;
