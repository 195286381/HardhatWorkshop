import { Provider } from './../../node_modules/ethers/src.ts/providers/provider';
import { ethers } from "ethers";
import "dotenv/config";
/**
 * 在以太坊上，智能合约的部署是一种特殊的交易：将编译智能合约得到的字节码发送到0地址
*/


;(async() => {
    // 连接到一条网络, 这里选择 chainlist 获取的一个网络姐节点.
    // const provider = new ethers.JsonRpcProvider('https://ethereum-rpc.publicnode.com')
    const sepoliaProvider = new ethers.JsonRpcProvider(process.env.SEPOLIA_INFURA_URL)
 
    const privateKey = String(process.env.PRIVATE_KEY)

    const wallet = new ethers.Wallet(privateKey, sepoliaProvider)

    const abiWETH = [
        "event Transfer(address indexed from, address indexed to, uint amount)",
        "function name() public view returns(string)",
        "function balanceOf(address) public view returns(uint)",
        "function deposit() public payable",
        "function transfer(address, uint) public returns (bool)",
        "function withdraw(uint) public",
    ];
    // WETH合约地址（Sepolia测试网）
    const addressWETH = '0xf531B8F309Be94191af87605CfBf600D71C2cFe0' // WETH Contract

    // 声明可写合约
    const contractWETH = new ethers.Contract(addressWETH, abiWETH, wallet)

    const name = await contractWETH.name()
    console.log(name) // what the fxxk.

    // 得到当前block
    const block = await sepoliaProvider.getBlockNumber()
    console.log(`当前区块高度: ${block}`);
    console.log(`打印事件详情:`);
    const transferEvents = await contractWETH.queryFilter('Transfer', block - 1000, block)
    // 打印第1个Transfer事件
    console.log(transferEvents[0])
    /**
     * 打印事件详情:
EventLog {
  provider: JsonRpcProvider {},
  transactionHash: '0xa8f5f2222ec6628b22138cbbe4f41de780ba12835129f7dfff8d710570c44604',
  blockHash: '0xafdb67e9e7a789578feb798711b9bbfab613a412bc4d82e66a119f13d477e824',
  blockNumber: 6350809,
  removed: false,
  address: '0xf531B8F309Be94191af87605CfBf600D71C2cFe0',
  data: '0x00000000000000000000000000000000000000000000000000038d7ea4c68000',
  topics: [
    '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
    '0x0000000000000000000000000000000000000000000000000000000000000000',
    '0x000000000000000000000000bd12d42158978db27b6852419c54c989004fd4c6'
  ],
  index: 169,
  transactionIndex: 78,
  interface: Interface {
    fragments: [
      [EventFragment],
      [FunctionFragment],
      [FunctionFragment],
      [FunctionFragment],
      [FunctionFragment],
      [FunctionFragment]
    ],
    deploy: ConstructorFragment {
      type: 'constructor',
      inputs: [],
      payable: false,
      gas: null
    },
    fallback: null,
    receive: false
  },
  fragment: EventFragment {
    type: 'event',
    inputs: [ [ParamType], [ParamType], [ParamType] ],
    name: 'Transfer',
    anonymous: false
  },
  args: Result(3) [
    '0x0000000000000000000000000000000000000000',
    '0xBD12D42158978dB27B6852419C54c989004Fd4C6',
    1000000000000000n
  ]
}

     */
})()