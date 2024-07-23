# Hardhat Project

## This is a Hardhat Contract Development Scaffold
This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a Hardhat Ignition module that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat ignition deploy ./ignition/modules/Lock.ts
```

## Deploying the SimpleStorage.sol Contract to the Sepolia Testnet
```shell
# deploy to sepolia testnet
npx hardhat ignitign deploy ./ignition/modules/Lock.ts --network sepolia
```

## Some Thoughts on Smart Contract Development
In smart contract development, you might spend only 20% of your time actually writing the contract code, while 80% of the time could be devoted to testing your contracts. **CODE IS LAW**, once a smart contract is deployed, it cannot be altered, making testing an essential step to ensure the correctness of your contract.

## Why You Should User Hardhat Smart Contract Development Framework
- the most mainstream development framework.
- the richest community support and plugin ecosystem.