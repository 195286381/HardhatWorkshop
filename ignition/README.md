# ignition使用常见问题.

## 如何部署了一个合约之后, 再次进行重复部署.
你可以尝试使用`--reset`参数来重置合约的部署状态.
```shell
npx hardhat ignition deploy ./ignition/modules/Lock.ts --network sepolia --reset
```