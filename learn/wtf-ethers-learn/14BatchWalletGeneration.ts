import { ethers } from 'ethers'
import "dotenv/config"


/**
 * ----- 利用 HD钱包批量生成钱包 ------
 */

/**
 * 根据助记词生成给定数量的密钥钱包
 * @param mnmemonic 
 * @param length 
 * @returns 
 */
const getWallets = (mnmemonic: string, number: number) => {
    // 助记词
    
    // 创建hdNode.
    const hdNode = ethers.HDNodeWallet.fromPhrase(mnemonic, "44'/60'/0'/0")

    const wallets = [];
    for (let index = 0; index < number; index++) {
        const privateKey = hdNode.derivePath(`${index}`).privateKey
        const wallet = new ethers.Wallet(privateKey)
        wallets.push(wallet)
    }
    return wallets
}


// useage
const mnemonic = String(String(process.env.MNMEMONIC))
const number = 30
getWallets(mnemonic, number).forEach((wallet, index) => {
    console.log(`钱包${index + 1}地址: ${wallet.address}`)
    console.log(`钱包${index + 1}私钥: ${wallet.privateKey}`)
})
