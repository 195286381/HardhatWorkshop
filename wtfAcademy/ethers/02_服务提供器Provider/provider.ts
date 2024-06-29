import { ethers } from "ethers"


// 利用 provider 读取链上数据.
const main = async () => {
    const provider = ethers.getDefaultProvider()
    // 1. 利用provider读取主网v神的eth余额
    const balance = await provider.getBalance('vitalik.eth')
    console.log(ethers.formatEther(balance));
    // 2. 利用getNetwork查询provider连接到那条链, HomeStead代表主网.
    const network = await provider.getNetwork()
    console.log(network.toJSON())
    // 3. 利用getBlockNumber查询provider连接到那条链的区块高度
    const blockNumber = await provider.getBlockNumber()
    console.log(blockNumber)
    // 4. 利用getTransactionCount查询某个钱包交易的次数.
    const transactionCount = await provider.getTransactionCount('vitalik.eth')
    console.log(transactionCount)
    // 5. 利用getFeeData查询当前建议的gas设置,返回的数据格式为 bigint.
    const feeData = await provider.getFeeData()
    console.log(feeData);
    // 6. 利用getBlock()查询区块信息，参数为要查询的区块高度
    const block0  = await provider.getBlock(0)
    console.log(block0);
    // 7. 利用getCode()查询某个地址的合约bytecode，参数为合约地址
    const wethAddress = '0xc778417e063141139fce010982780140aa0cd5ab'
    const code = await provider.getCode(wethAddress)
    console.log(code)
    
}

main()