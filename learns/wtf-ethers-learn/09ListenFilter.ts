import { ethers } from 'ethers'
import "dotenv/config"


/**
 * 
 * 构建过滤器
ethers.js中的合约类提供了contract.filters来简化过滤器的创建：

const filter = contract.filters.EVENT_NAME( ...args ) 

Copy
其中EVENT_NAME为要过滤的事件名，..args为主题集/条件。前面的规则有一点抽象，下面举几个例子。

过滤来自myAddress地址的Transfer事件

contract.filters.Transfer(myAddress)

Copy
过滤所有发给 myAddress地址的Transfer事件

contract.filters.Transfer(null, myAddress)

Copy
过滤所有从 myAddress发给otherAddress的Transfer事件

contract.filters.Transfer(myAddress, otherAddress)

Copy
过滤所有发给myAddress或otherAddress的Transfer事件

contract.filters.Transfer(null, [ myAddress, otherAddress ])
 */
;(async() => {
    const provider = new ethers.JsonRpcProvider(process.env.MAINNET_INFURA_URL)

    const wallet = new ethers.Wallet(String(process.env.PRIVATE_KEY), provider)

    // USDT的合约地址
    const contractAddress = '0xdac17f958d2ee523a2206206994597c13d831ec7'

    // 构建USDT的Transfer的ABI
    const abi = [
    "event Transfer(address indexed from, address indexed to, uint value)"
    ];

    // 生成USDT合约对象
    const contractUSDT = new ethers.Contract(contractAddress, abi, provider);

    // binance 交易所地址
    const accountBinance = '0x28C6c06298d514Db089934071355E5743bf21d60'
    

    // 创建一个合约过滤器
    const transferFilter = contractUSDT.filters.Transfer(null, accountBinance)

    // 监听转入交易的日志.
    contractUSDT.on(transferFilter, (from, to, value) => {
        // 打印结果
        console.log(
            `${from} -> ${to} ${ethers.formatUnits(ethers.getBigInt(value),6)}`
        )
    })
    
})()