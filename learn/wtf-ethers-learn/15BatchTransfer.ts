import { ethers } from 'ethers'
import { Contract } from 'ethers/src.ts/contract'

/**
 * 批量转账.
 * 思路: 
 * 1. 先获取所有地址.
 * 2. 利用空投合约批量multipleTransfer可以节省gas花销.
 * 3. 如果是token转账合约批量转账需要先approve.
 */

// 这里是 收账地址
const receiveAddr = '0xBD12D42158978dB27B6852419C54c989004Fd4C6' 

// 这里使用hardhat本地测试网.
const providerLocal = new ethers.JsonRpcProvider('http://127.0.0.1:8545')




// 使用hardhat本地的私钥. 这里使用hardhad生成的四个私钥地址
// warning: 以下私钥请不要用于主网使用.
const privateKeys = [
    '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80',
    '0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d',
    '0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a',
    '0x7c852118294e51e653712a81e05800f419141751be58f605c371e15141b007a6'
]

const wallets = privateKeys.map((v, i, a) => {
    const privateKey = v;
    return new ethers.Wallet(privateKey)
})


// 批量进行代币转账.
const batchTransferETH = async () => {
    wallets.forEach(async (wallet) => {
        const walletLocal = wallet.connect(providerLocal)
        const tx = {
            to: receiveAddr,
            value: ethers.parseEther('10'),
        }
        const txRes = await walletLocal.sendTransaction(tx)
        await txRes.wait()
        console.log(`${walletLocal.address}转账成功`)
        /**
         输出:
            0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266转账成功
            0x70997970C51812dc3A010C7d01b50e0d17dc79C8转账成功
            0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC转账成功
            0x90F79bf6EB2c4f870365E785982E1f101E93b906转账成功
         */
    })
}

// 批量进行代币转账.
const batchTransferToken = async (token: Contract, ownerAddr: string, wallets: Array<any>, amounts: Array<number>) => {
    wallets.forEach(async (v, i, a) => {
        const txRes = await token.transferFrom(ownerAddr, v, amounts[i])
        await txRes.wait()
    })
}

const start = async() => {
    
}