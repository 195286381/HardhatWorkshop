import { Contract, formatEther, getDefaultProvider } from "ethers";
import { abiWETH, addressWETH } from "./constant";

const provider = getDefaultProvider()
// 创建了一个只读合约.
const contractWETH = new Contract(addressWETH, abiWETH, provider)

const main = async () => {
    const balance = await contractWETH.balanceOf('vitalik.eth')
    console.log(formatEther(balance));
    const name = await contractWETH.name()
    console.log(name);
    const totalSupply = await contractWETH.totalSupply()
    console.log(formatEther(totalSupply));
}

main()