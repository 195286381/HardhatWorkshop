import { MerkleTree } from 'merkletreejs';
import { keccak256 } from 'ethers';
/**
 * 基于默克尔树的证明工具类.
 * @description merkleTreeProof
 */
class MerkleTreeProof {
    private tokens: Array<string>
    private leafs: Array<string>
    private root: string
    private merkleTree: MerkleTree
    constructor(tokens: Array<string>) {
        this.tokens = tokens;
        this.leafs = tokens.map((token) => keccak256(Buffer.from(token)))
        this.merkleTree = new MerkleTree(this.leafs, keccak256, { sortPairs: true });
        this.root = this.merkleTree.getHexRoot();
    }
    getTokens():Array<string> {
        return this.tokens;
    }
    getLeafs():Array<string> {
        return this.leafs;
    }
    getRoot():string {
        return this.root;
    }
    getProof(index: number):Array<string> {
        return this.merkleTree.getHexProof(this.leafs[index]);
    }
}

export default MerkleTreeProof;