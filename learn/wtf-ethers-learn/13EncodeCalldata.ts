import { ethers } from 'ethers'
import "dotenv/config"

/**
 * 编码 calldata.
 */

;(async() => {
    // const provider = new ethers.JsonRpcProvider(process.env.MAINNET_INFURA_URL)
    const provider = new ethers.JsonRpcProvider('https://1rpc.io/eth')
    const wallet = new ethers.Wallet(String(process.env.PRIVATE_KEY), provider)
})()