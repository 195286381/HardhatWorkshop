import { ethers } from 'ethers'
import "dotenv/config"

// 0x80ac58cd 为 IERC721接口的4字节签名

/**
 * 识别合约的类型 (以IERC721接口为例)

// IERC165接口 定义了接口识别的方法. 主要是用到 supportsInterface 方法, 传入接口的4字节签名来进行校验.
function supportsInterface(bytes4 interfaceId)
    external
    pure
    override
    returns (bool)
{
    return
        interfaceId == type(IERC721).interfaceId 
}
 */

;(async() => {
    // const provider = new ethers.JsonRpcProvider(process.env.MAINNET_INFURA_URL)
    const provider = new ethers.JsonRpcProvider('https://1rpc.io/eth')
    const wallet = new ethers.Wallet(String(process.env.PRIVATE_KEY), provider)
    // 合约abi
    const abiERC721 = [
        "function name() view returns (string)",
        "function symbol() view returns (string)",
        "function supportsInterface(bytes4) public view returns(bool)",
    ];
    // ERC721的合约地址，这里用的BAYC
    const addressBAYC = "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d"
    // 创建ERC721合约实例
    const contractERC721 = new ethers.Contract(addressBAYC, abiERC721, provider)
    const result = await contractERC721.supportsInterface('0x80ac58cd') // true 返回.
    console.log(result)
})()