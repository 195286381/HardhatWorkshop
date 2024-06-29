# Hardhat Project

## 这是一个hardhat合约开发脚手架的代码练习仓库
This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a Hardhat Ignition module that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat ignition deploy ./ignition/modules/Lock.ts
```

## 部署SimpleStorage.sol合约到sepolia测试网
```shell
# deploy to sepolia testnet
npx hardhat ignitign deploy ./ignition/modules/Lock.ts --network sepolia
```

## 关于智能合约开发的一些思考
智能合约中你实际进行合约编码的时间可能只有20%, 80%的事件你可能都要用来进行合约的测试. **CODE IS LAW**, 智能合约一旦部署上线则不能修改, 测试是一个非常必要的步骤, 需要确保你的合约的正确性. 

## hardhat仍然是最主流的智能合约开发框架
- hardhat 仍然是最主流的开发框架.
- 最丰富的社区支持和插件生态.