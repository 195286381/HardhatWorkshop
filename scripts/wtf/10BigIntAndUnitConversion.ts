import { ethers } from 'ethers'
import "dotenv/config"


/**
 * 
 * 以太坊中，许多计算都对超出JavaScript整数的安全值（js中最大安全整数为9007199254740991）。因此，ethers.js使用 JavaScript ES2020 版本原生的 BigInt 类 安全地对任何数量级的数字进行数学运算。在ethers.js中，大多数需要返回值的操作将返回 BigInt，而接受值的参数也会接受它们。
 * ====== 在以太坊中返回的数据大多是 bigint数值.
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