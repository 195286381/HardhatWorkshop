import { ethers } from "ethers"
import "dotenv/config"
import { MerkleTree } from "merkletreejs"

// 白名单地址
const tokens = [
    "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266", 
    "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
    "0x90F79bf6EB2c4f870365E785982E1f101E93b906"
];

const leaf = tokens.map(x => ethers.keccak256(x))

console.log(leaf)
// 创建merkleTree
const merkletree = new MerkleTree(leaf, ethers.keccak256, { sortPairs: true });

console.log(merkletree.getHexRoot())