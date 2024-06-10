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
