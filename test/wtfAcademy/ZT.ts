import { loadFixture } from '@nomicfoundation/hardhat-toolbox/network-helpers'
import { expect } from 'chai'
import hre from 'hardhat'

describe('ZT', () => {
    // and reset Hardhat Network to that snapshot in every test.
  async function deployZTContractFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await hre.ethers.getSigners()

    const ZTContractFactory = await hre.ethers.getContractFactory('ZT')
    const zTContract = await ZTContractFactory.deploy()

    return { zTContract, owner, otherAccount }
  }

  describe('Deployment', () => {
    it('Should set the right owner', async () => {
      const { zTContract, owner, otherAccount } = await loadFixture(deployZTContractFixture);
      console.log(await owner.provider.getBalance(otherAccount.address));
      console.log(await zTContract.getAddress())
      await zTContract.mint(otherAccount.address, 100);
      await zTContract.mint(owner.address, 100);
      console.log(await zTContract.balanceOf(owner.address));
      await zTContract.transfer(otherAccount.address, 25);
      console.log(await zTContract.balanceOf(otherAccount.address));
      console.log(await zTContract.balanceOf(owner.address));
      console.log(await owner.provider.getBalance(owner.address));
    })
  })

})