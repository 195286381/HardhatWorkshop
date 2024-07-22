import { Provider } from './../../node_modules/ethers/src.ts/providers/provider';
import { ethers } from "ethers";
import "dotenv/config";
/**
 * 在以太坊上，智能合约的部署是一种特殊的交易：将编译智能合约得到的字节码发送到0地址
*/


;(async() => {
    // 连接到一条网络, 这里选择 chainlist 获取的一个网络姐节点.
    // const provider = new ethers.JsonRpcProvider('https://ethereum-rpc.publicnode.com')
    console.log(process.env.MAINNET_INFURA_URL)
    const provider = new ethers.JsonRpcProvider(process.env.MAINNET_INFURA_URL)
 
    const privateKey = String(process.env.PRIVATE_KEY)

    const wallet = new ethers.Wallet(privateKey, provider)

    // USDT的合约地址
    const contractAddress = '0xdac17f958d2ee523a2206206994597c13d831ec7'
    // 构建USDT的Transfer的ABI
    const abi = [
    "event Transfer(address indexed from, address indexed to, uint value)"
    ];
    // 生成USDT合约对象
    const contractUSDT = new ethers.Contract(contractAddress, abi, provider);

    contractUSDT.once('Transfer', (from, to, value) => {
        // 打印结果
        console.log(
            `${from} -> ${to} ${ethers.formatUnits(ethers.getBigInt(value),6)}`
        )
    })
})()

/**
 *  输出结果如下: 
[Running] ts-node "/Users/zhuzhiwei/web3/demo_projects/HardhatWorkshop/scripts/wtf/08ListenContract.ts"
https://mainnet.infura.io/v3/b2dbdb16f8034f65a9e1bb097f8b1c29
0x9Db9e0e53058C89e5B94e29621a205198648425B -> 0x51C72848c68a965f66FA7a88855F9f7784502a7F 43731.215

[Done] exited with code=0 in 17.075 seconds


 */