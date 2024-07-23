import { ethers } from 'ethers'
import "dotenv/config"
;(async () => {
    // 构建 provider
    const provider = new ethers.JsonRpcProvider(process.env.MAINNET_INFURA_URL)
    // 构建 signer
    const privateKey = String(process.env.PRIVATE_KEY)
    const wallet = new ethers.Wallet(privateKey, provider)
    console.log(wallet.address)
    console.log(
        'balance:',
        ethers.formatEther(await provider.getBalance(wallet.address))
    )
})()