import { Provider } from './../../node_modules/ethers/src.ts/providers/provider';
import { ethers } from "ethers";
import "dotenv/config";
/**
 * 展示如何声明可写的Contract合约变量，并利用它与测试网的WETH合约交互。
 * const contract = new ethers.Contract(address, abi, signer)
 * ======= 可读写的 contract =======
*/


;(async() => {
    // 连接到一条网络, 这里选择 chainlist 获取的一个网络姐节点.
    // const provider = new ethers.JsonRpcProvider('https://ethereum-rpc.publicnode.com')
    const sepoliaProvider = new ethers.JsonRpcProvider(process.env.SEPOLIA_INFURA_URL)
 
    const privateKey = String(process.env.PRIVATE_KEY)

    const wallet = new ethers.Wallet(privateKey, sepoliaProvider)

    const addr = await wallet.getAddress()


    // WETH的ABI
    const abiWETH = [
        "function balanceOf(address) public view returns(uint)",
        "function deposit() public payable",
        "function transfer(address, uint) public returns (bool)",
        "function withdraw(uint) public",
    ];
    // WETH合约地址（Sepolia测试网）
    const addressWETH = '0xf531B8F309Be94191af87605CfBf600D71C2cFe0' // WETH Contract

    // 声明可写合约
    const contractWETH = new ethers.Contract(addressWETH, abiWETH, wallet)
    // 也可以声明一个只读合约，再用connect(wallet)函数转换成可写合约。
    // const contractWETH = new ethers.Contract(addressWETH, abiWETH, provider)
    // contractWETH.connect(wallet)

    const balance = await contractWETH.balanceOf(addr)
    console.log(ethers.formatEther(balance)) // 0.001

    // const txRes = await contractWETH.deposit({value: ethers.parseEther('0.001')})
    // const receipt = await txRes.wait()
    // console.log(receipt)
    const vitalikBalance = await contractWETH.balanceOf('vitalik.eth')
    console.log(ethers.formatEther(vitalikBalance)) // 0.00502002
    const txRes2 = await contractWETH.transfer('vitalik.eth', ethers.parseEther('0.0001'));
    const receipt2 = await txRes2.wait()
    const vitalikBalance2 = await contractWETH.balanceOf('vitalik.eth')
    console.log(ethers.formatEther(vitalikBalance2)) // 0.00512002 可以看到 v神的账户上多了 0.0001 ether.

})()