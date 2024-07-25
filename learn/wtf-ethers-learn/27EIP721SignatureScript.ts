import { ethers, JsonRpcProvider, TypedDataDomain, Wallet } from 'ethers'
import 'dotenv/config'
/**
 * EIP721 类型化数字签名.✍️
 * EIP721 提供了一种更高效、更安全的签名方法. 当支持EIP721的DAPP请求签名时, 钱包会展示签名消息的原始数据, 用户可以在验证数据符合预期之后签名,
 * 此外你也可以使用脚本生成 EIP721 签名.
 * ----------------------------------------------------------------------
 * ===== 对应于 ethers.signTypedData 和 ethers.verifyTypedData 方法. ======
 * 工具类可以参考 scripts/utils/signatureProof.ts
 */

// 1. 构建钱包和Wallet.
const provider = new JsonRpcProvider(String(process.env.MAINNET_INFURA_URL))
const wallet = new Wallet(String(process.env.PRIVATE_KEY), provider)

// 2. 创建 EIP821 Domain.
const domain: TypedDataDomain = {
    name: "EIP712Storage",
    version: "1",
    chainId: 1,
    verifyingContract: "0xf8e81D47203A594245E36C48e151709F0C19fBe8"
}

// 3. 创建签名消息的类型化数据，其中 types 声明类型，而 message 包含数据。
const types = {
    Storage: [
        { name: "spender", type: "address" },
        { name: "number", type: "uint256" }
    ]
}

const message = {
    spender: "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4",
    number: "100"
}

// 4. 调用 wallet 对象的 signTypedData前面方法, 参数为之前的domain、types、message。
;(async () => {
    const signature = await wallet.signTypedData(domain, types, message)
    console.log(signature)
    const eip712Signer = ethers.verifyTypedData(domain, types, message, signature)
    console.log(eip712Signer)
    console.log(eip712Signer === process.env.ADDRESS)
    wallet.signMessage(JSON.stringify(message)).then(console.log)
})()
