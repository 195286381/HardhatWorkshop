import { ethers } from 'ethers'
import "dotenv/config"


/**
 * 静态调用
 * 我们介绍合约类的staticCall方法，在发送交易之前检查交易是否会失败，节省大量gas。
 * staticCall方法是属于ethers.Contract类的编写方法分析，同类的还有populateTransaction和estimateGas方法。
 */
;(async() => {
    // const provider = new ethers.JsonRpcProvider(process.env.MAINNET_INFURA_URL)
    const provider = new ethers.JsonRpcProvider('https://1rpc.io/eth')
    const wallet = new ethers.Wallet(String(process.env.PRIVATE_KEY), provider)

        // DAI的ABI
    const abiDAI = [
        "function balanceOf(address) public view returns(uint)",
        "function transfer(address, uint) public returns (bool)",
    ];
    // DAI合约地址（主网）
    const addressDAI = '0x6B175474E89094C44Da98b954EedeAC495271d0F' // DAI Contract
    // 创建DAI合约实例
    const contractDAI = new ethers.Contract(addressDAI, abiDAI, wallet)


    try {
            // 通过 staticCall进行 模拟转账.
    const txRes = await contractDAI.transfer.staticCall('vitalik.eth', 1);
    console.log(txRes);
    } catch (error: any){
        console.log(error.code) // CALL_EXCEPTION
        console.log(error.message)
    }


    
    
})()