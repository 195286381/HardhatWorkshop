import { ethers } from 'hardhat'
;(async() => {
    const faucetContractFactory =  await ethers.getContractFactory("Faucet")
    const faucetContract = await faucetContractFactory.deploy()
    await faucetContract.waitForDeployment()
    console.log(faucetContract)
})()
