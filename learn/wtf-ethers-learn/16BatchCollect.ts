import { Provider, Signer, Wallet } from 'ethers';
import { ethers }  from 'ethers'
import 'dotenv/config'
import contractInfo from '../../artifacts/contracts/token/MT.sol/MT.json'

const privateKey = String(process.env.PRIVATE_KEY)
const wallet  = new ethers.Wallet(privateKey)
const provider = new ethers.JsonRpcProvider('http://127.0.0.1:8545')

// 部署mt合约.
const deployToken = async (wallet: Wallet, provider: Provider) => {

    // 创建一个 MT 的 token.
    const MT = new ethers.ContractFactory(contractInfo.abi, contractInfo.bytecode, wallet.connect(provider))
    const mt = await MT.deploy()
    await mt.waitForDeployment()
    console.log('部署完成的合约地址 : ', mt.target)
    return mt
} // 0x0a209e4C999730d816C57d27BF2F48Cc933F51F1

deployToken(wallet, provider)
