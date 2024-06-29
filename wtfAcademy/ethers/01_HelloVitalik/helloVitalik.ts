import { ethers } from "ethers"

const main = async () => {
    const provider = ethers.getDefaultProvider()
    const balance = await provider.getBalance('vitalik.eth')
    console.log(ethers.formatEther(balance));
    
}

main()