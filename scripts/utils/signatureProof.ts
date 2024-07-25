import { ethers, Signer, TypedDataDomain } from 'ethers'
import 'dotenv/config'
import { throttle } from 'lodash'


/**
 * 签名验证工具类, 支持普通签名 和 EIP721类型化数据签名.
 */
export class SignatureProof {
    private signer: Signer;
    constructor(signer: Signer) {
        this.signer = signer
    }

    getSigner(): Signer {
        return this.signer
    }

    setSigner(signer: Signer) {
        this.signer = signer
    }
    
    signMessage(types: Array<string>, values: Array<string>): Promise<string> {
        const msgHash = ethers.solidityPackedKeccak256(types, values)
        const messageHashBytes = ethers.getBytes(msgHash)
        return this.signer.signMessage(messageHashBytes)
    }

    
    async SignTypedData(typeDataDomain :TypedDataDomain, types: Record<string, Array<ethers.TypedDataField>>, values: Record<string, any>) {
        return await this.signer.signTypedData(typeDataDomain, types, values)
    }

    verifyMessage(types: readonly string[], values: readonly any[], signature: ethers.SignatureLike) {
        return ethers.verifyMessage(ethers.solidityPackedKeccak256(types, values), signature)
    }

    verifyTypedData(typeDataDomain :TypedDataDomain, types: Record<string, Array<ethers.TypedDataField>>, values: Record<string, any>, signature: ethers.SignatureLike) {
        return ethers.verifyTypedData(typeDataDomain, types, values, signature)
    }
}


// 普通消息
// const types = ['address', 'uint256']
// const values = ['0x5B38Da6a701c568545dCfcB03FcB875f56beddC4', '100']

// EIP712 类型化消息
// const typedDataDomain: TypedDataDomain = {
//     name: "EIP712Storage",
//     version: "1",
//     chainId: 1,
//     verifyingContract: "0xf8e81D47203A594245E36C48e151709F0C19fBe8"
// }
// const types = {
//     Storage: [
//         { name: "spender", type: "address" },
//         { name: "number", type: "uint256" }
//     ]
// }
// const values = {
//     spender: "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4",
//     number: "100"
// }

