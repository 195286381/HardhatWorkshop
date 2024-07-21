import { Provider } from './../../node_modules/ethers/src.ts/providers/provider';
import { ethers } from "ethers";
import "dotenv/config";
/**
 * 发送以太坊ETH.
 * 
 * 这里要介绍 Signer 签名者类 和它派生的Wallet钱包类.
 * 
 * Signer 签名者类是以太坊账户的抽象, 可用于对消息和交易进行签名, 并将签名的交易发送到以太坊网络, 并更改区块链状态.
 * 
 * Wallet 继承了 Signer, 并且开发者可以像包含私钥的外部拥有账户(EOA)一样, 用它对交易和消息进行签名.
 * 
 * ===== Signer 签名者类是 以太坊账户 的抽象, Wallet 继承了 Signer, 并且开发者可以像包含私钥的外部拥有账户(EOA)一样, 用它对交易和消息进行签名. ========
*/


;(async() => {
    // 连接到一条网络, 这里选择 chainlist 获取的一个网络姐节点.
    // const provider = new ethers.JsonRpcProvider('https://ethereum-rpc.publicnode.com')
       const sepoliaProvider = new ethers.JsonRpcProvider(process.env.SEPOLIA_INFURA_URL)
    // console.log(vars.get("PRIVATE_KEY"))
    // 这里演示创建钱包的几种方法.

    // 1.创建随机的wallet钱包
    // const wallet = ethers.Wallet.createRandom()

    // 2.用私钥创建的wallet对象
    const privateKey = String(process.env.PRIVATE_KEY)
    const wallet = new ethers.Wallet(privateKey, sepoliaProvider)
    console.log(wallet.address)
    // 从助记词创建wallet对象
    // const wallet3 = ethers.Wallet.fromPhrase(mnemonic.phrase)
    const balance = await sepoliaProvider.getBalance(wallet.address)
    console.log(ethers.formatEther(balance))


    // 创建一个发送以太的交易.
    // to 为接收以太的用户.
    // value 为传输的值
    const tx = {
        to: '0x8C92B4A1344Ad5886257b659F5a4eCFB1fcC8E96',
        value: ethers.parseEther('0.002')
    }


    // 这里演示了用我的开发主账号像我的开发account2转账了0.002ether.
    // const txRes = await wallet.sendTransaction(tx)
    // const receipt = await txRes.wait()
    // console.log(receipt)
    /**
     * 
     *
     * 打印交易结果如下: 
TransactionReceipt {
  provider: JsonRpcProvider {},
  to: '0x8C92B4A1344Ad5886257b659F5a4eCFB1fcC8E96',
  from: '0xBD12D42158978dB27B6852419C54c989004Fd4C6',
  contractAddress: null,
  hash: '0x66e154936d2b602576b6085257dfd2fc312282719f6a54338b383f37d97c67f8',
  index: 71,
  blockHash: '0x8eb97e7e4cd9623ec10279e485fd0734d9934bbf58022c589f99558825aa00b2',
  blockNumber: 6350677,
  logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
  gasUsed: 21000n,
  blobGasUsed: null,
  cumulativeGasUsed: 10608881n,
  gasPrice: 1629274315n,
  blobGasPrice: null,
  type: 2,
  status: 1,
  root: undefined
}
     */


    // 获取钱包地址.
    const addr = await wallet.getAddress()
    console.log(addr)
    
    // 获取钱包私钥
    const pk = wallet.privateKey
    console.log(pk)
    
    // 获取钱包的交易次数
    const count = await sepoliaProvider.getTransactionCount(addr);
    console.log(count)

    // 介绍了Signer签名者类和Wallet钱包类，使用钱包实例获取了地址、助记词、私钥、链上交互次数，并发送ETH。
})()