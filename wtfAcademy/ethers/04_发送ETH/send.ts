import { JsonRpcProvider, ethers } from 'ethers'
import { vars } from 'hardhat/config'
const sepoliaUrl  = 'https://sepolia.infura.io/v3/b2dbdb16f8034f65a9e1bb097f8b1c29'
// const provider = new JsonRpcProvider(sepoliaUrl)
console.log(vars.get('INFURA_API_KEY'))