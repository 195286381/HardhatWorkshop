import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";
/**
 * 编写inherit的测试用例.
 */
describe("Inherit", function () {
    const ACCOUNT_ADDRESS = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
    async function deployInheritFixture() {
        const [account1, account2]= await ethers.getSigners();
        const Erzi = await ethers.deployContract("Erzi");
        await Erzi.waitForDeployment();
        return { account1, Erzi };
    }

    describe("Deployment", function () {
        it("Should set the right owner", async function () {
            const { account1, Erzi } = await loadFixture(deployInheritFixture);
            const ret = await Erzi.eat();
            expect(ret).to.equal("erzi eat");
            expect(account1.address).to.equal(ACCOUNT_ADDRESS);
        });
    });
});
