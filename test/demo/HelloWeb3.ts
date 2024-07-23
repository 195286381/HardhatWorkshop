import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { ethers } from "hardhat"
import { expect } from 'chai'
describe('HelloWeb3', () => {
    async function deployHelloWeb3Fixture() {
        const [account] = await ethers.getSigners()
        const HelloWeb3 = await ethers.getContractFactory('HelloWeb3')
        const helloWeb3 = await HelloWeb3.deploy('Hello Web3!')
        await helloWeb3.waitForDeployment
        return { account, helloWeb3 }
    }

    describe('deploy', () => {
        it('should deploy', async () => {
            const {account, helloWeb3} = await loadFixture(deployHelloWeb3Fixture)
            expect(await helloWeb3.greet()).to.equal('Hello Web3!')
        })
        it('should greet', async () => {
            const {account, helloWeb3} = await loadFixture(deployHelloWeb3Fixture)
            expect(await helloWeb3.greet()).to.equal('Hello Web3!')
        })
        it('should change greet', async () => {
            const {account, helloWeb3} = await loadFixture(deployHelloWeb3Fixture)
            await helloWeb3.setGreeting('Hello Another World!')
            expect(await helloWeb3.greet()).to.equal('Hello Another World!')
        })
    })
})