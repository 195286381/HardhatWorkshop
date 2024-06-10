import { loadFixture } from '@nomicfoundation/hardhat-toolbox/network-helpers'
import { expect } from 'chai'
import hre from 'hardhat'

 // and reset Hardhat Network to that snapshot in every test.
 async function deploySimpleStorageContractFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await hre.ethers.getSigners()

    const simpleStorageContractFactory = await hre.ethers.getContractFactory('SimpleStorage')
    const simpleStorageContract = await simpleStorageContractFactory.deploy()

    return { simpleStorageContract, owner, otherAccount }
  }

describe('Deployment', () => {
    it('Should set message to chainlink workshop', async () => {
        const { simpleStorageContract, owner, otherAccount } = await loadFixture(deploySimpleStorageContractFixture)

        const actualMessage = await simpleStorageContract.getMessage()
        const expectedMessage = 'chainlink workshop'

        expect(actualMessage).to.equal(expectedMessage)
    })

    it ('Should set message to a new value', async () => {
        const { simpleStorageContract, owner, otherAccount } = await loadFixture(deploySimpleStorageContractFixture)
        await simpleStorageContract.setMessage('new message')
        const actualMessage = await simpleStorageContract.getMessage()
        const expectedMessage = 'new message'
        expect(actualMessage).to.equal(expectedMessage)
    })
})


describe('#setMessage', () => {
    it('owner can call this method', async () => {
        const { simpleStorageContract, otherAccount } = await loadFixture(deploySimpleStorageContractFixture)
        await expect(simpleStorageContract.setMessage('new message')).to.emit(simpleStorageContract, 'MessageChanged').withArgs('new message')
    })
    it('otherAccount can\'t call this method', async () => {
        const { simpleStorageContract, otherAccount } = await loadFixture(deploySimpleStorageContractFixture)
        await expect(simpleStorageContract.connect(otherAccount).setMessage('new message')).to.be.revertedWith('Only owner can call this function')
    })
})