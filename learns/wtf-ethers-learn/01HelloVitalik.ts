import { ethers } from "ethers";

const provider = ethers.getDefaultProvider('mainnet');


// 输出大小.
(async () => {
    // 输出主网的区块高度.
    console.log(await provider.getBlockNumber());
    // 输出主网v神的eth数
    console.log(await provider.getBalance('vitalik.eth'));
    // 输出主网v神的eth数 (通过formatEther增加可读性)
    console.log(ethers.formatEther(await provider.getBalance('vitalik.eth')));
})();