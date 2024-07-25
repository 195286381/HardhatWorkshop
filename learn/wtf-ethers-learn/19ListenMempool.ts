import { throttle } from "lodash"
import { ethers } from "ethers"

const provider = new ethers.WebSocketProvider('wss://mainnet.infura.io/ws/v3/b2dbdb16f8034f65a9e1bb097f8b1c29')
// const wallet = new ethers.Wallet(String(process.env.PRIVATE_KEY), provider)

provider.on('pending', throttle(async (txHash: string) => {
    txHash = txHash.toLowerCase()
    const tx = await provider.getTransaction(txHash)
    console.log(`\n[${(new Date).toLocaleTimeString()}] 监听Pending交易: ${txHash} \r`);
    console.log(tx);
}, 1000))