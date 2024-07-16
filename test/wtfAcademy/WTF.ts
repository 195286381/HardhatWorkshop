import { loadFixture } from '@nomicfoundation/hardhat-toolbox/network-helpers'
import { expect } from 'chai'
import hre from 'hardhat'

describe('WTF', () => {
    // and reset Hardhat Network to that snapshot in every test.
  async function deploySimpleStorageContractFixture() {
      // Contracts are deployed using the first signer/account by default
      const [owner, otherAccount] = await hre.ethers.getSigners()

      const wTFContractFactory = await hre.ethers.getContractFactory('WTF')
      const wTFContract = await wTFContractFactory.deploy()

      return { wTFContract, owner, otherAccount }
    }
    
  describe('Deployment', () => {
      it('deploy wtf contract', async () => {
          const { wTFContract, owner, otherAccount } = await loadFixture(deploySimpleStorageContractFixture)
          // query contract balance
          const balance = await wTFContract.balanceOf(owner.address)
          console.log(balance === 2_100_000_000n)
          await wTFContract.transfer(otherAccount.address, 1000)
          expect(await wTFContract.balanceOf(otherAccount.address)).to.equal(1000)
      })
  })

  describe('Transfer', () => {
    it('transfer owner 100 token', async () => {
      const { wTFContract, owner, otherAccount } = await loadFixture(deploySimpleStorageContractFixture)
      // mint 100 token.
      await wTFContract.mint(100);
      console.log('wtf test')
      console.log(await wTFContract.balanceOf(owner.address))
      expect(await wTFContract.balanceOf(owner.address)).to.equal(2100000100);
      await wTFContract.connect(otherAccount).mint(200);
      console.log(await wTFContract.balanceOf(otherAccount.address));
      expect((await wTFContract.balanceOf(otherAccount.address))).to.equal(200);
      wTFContract.connect(owner);
      await wTFContract.transfer(otherAccount.address, 100);
      expect(await wTFContract.balanceOf(otherAccount.address)).to.equal(300);
    })
  })

})