import { ethers } from "ethers"

/**
 * Contract 类
 * 在 ethers 中, Contract类是部署在以太坊网络上的合约(EVM字节码)的抽象.
 * 通过它, 开发者可以非常容易的对合约进行读取call和交易transaction. 并可以获得交易的结果和事件, 以太坊强大的地方正是合约.
 * 
 * 
 * ======= Contract 是 以太坊网络上合约的抽象 ========
*/


// 注意就以上的 contract 因为没有连接到钱包👛, 因此它仅仅是可读合约. 意味着只能调用查询接口, 不能改变值或者进行起交易
;(async() => {
    // 连接到一条网络, 这里选择 chainlist 获取的一个网络姐节点.
    const provider = new ethers.JsonRpcProvider('https://ethereum-rpc.publicnode.com')
    
    // 第1种输入abi的方式: 复制abi全文
    // WETH的abi可以在这里复制：https://etherscan.io/token/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2#code
    const abiWETH = '[{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"guy","type":"address"},{"name":"wad","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"src","type":"address"},{"name":"dst","type":"address"},{"name":"wad","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"wad","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"dst","type":"address"},{"name":"wad","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"deposit","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":true,"name":"guy","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":true,"name":"dst","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"dst","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Withdrawal","type":"event"}]'
    const addressWETH = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2' // WETH Contract
    const contractWETH = new ethers.Contract(addressWETH, abiWETH, provider)

    // 第2种由于abi可读性太差，ethers创新的引入了Human-Readable Abi
    // const abiERC20 = [
    //     "function name() view returns (string)",
    //     "function symbol() view returns (string)",
    //     "function totalSupply() view returns (uint256)",
    //     "function balanceOf(address) view returns (uint)",
    // ];
    // const addressDAI = '0x6B175474E89094C44Da98b954EedeAC495271d0F' // DAI Contract
    // const contractDAI = new ethers.Contract(addressDAI, abiERC20, provider)

    const nameWETH = await contractWETH.name()
    console.log(nameWETH)
    const symbolWETH = await contractWETH.symbol()
    console.log(symbolWETH)
    const balance = await contractWETH.balanceOf('vitalik.eth')
    console.log(ethers.formatEther(balance))
})()