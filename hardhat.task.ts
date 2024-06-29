import { task } from 'hardhat/config'
// 配置一些hardhat自定义task.
// 创建一个自定义任务打印所有的账户地址.
task('accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
    const accounts = await hre.ethers.getSigners();
    for (const account of accounts) {
      console.log(account.address);
    }
  });