import { ethers } from "ethers"

/**
 * 这里我们需要对 provider 有一个深入的了解.
 * provider 是一个以太坊网络连接的抽象.
 * 在 01 我们使用了默认提供者 defaultProvider.=
 * 在 ethers 中最常用的是 jsonRpcProvider, 可以让用户连接到特定节点服务商的节点,
 * 我们比较常用的网络节点公司有 Infura 和 Alchemy.
 * 也可以找 chainlist 提供的公开节点.
 * for example https://ethereum-rpc.publicnode.com
 * 
 * 
 * ========= 总之要记住的是 provider 是一个以太坊网络连接的抽象 =========
 */

const WETH = '0xc778417e063141139fce010982780140aa0cd5ab'

;(async() => {
    // 连接到一条网络, 这里选择 chainlist 获取的一个网络姐节点.
    const provider = new ethers.JsonRpcProvider('https://ethereum-rpc.publicnode.com')
    
    // 利用 provider 读取链上数据.
    // 1. 获取网络信息
    const network = await provider.getNetwork()
    console.log(network.toJSON())
    // 2. 查询区块高度.
    const blockNumber = await provider.getBlockNumber()
    console.log(blockNumber)
    // 3. 查看某个👛钱包的历史交易次数.
    const count = await provider.getTransactionCount('vitalik.eth')
    console.log(count)
    // 查看当前建议的gas设置.
    const feeData = await provider.getFeeData()
    console.log(feeData)
    // 查看区块信息
    const block = await provider.getBlock(blockNumber)
    console.log(block)
    // 查看bytecod
    const bytecode = await provider.getCode(WETH)
    console.log(bytecode)

})()