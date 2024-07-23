// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/**
 * @title airdrop contract
 * @author zhuzw
 * @notice 
 * 
 * this is a simple airdrop contract
 * 简单的空投合约, 用于转账 eth 或者 erc20 token
 * 
 */
contract AirDrop {
    /**
     * 
     * @param _to 接收的账号地址数组
     * @param _value 各账号接口的以太坊额度
     */
    function transferEth(address[] calldata _to, uint256[] memory _value) external {
        for (uint256 i = 0; i < _to.length; i++) {
            payable(_to[i]).transfer(_value[i]);
        }
    }

    /**
     * 
     * @param _token ERC20token合约地址.
     * @param _to 接收的账号地址数组
     * @param _value 各账号接收的代币数量
     */
    function transferERC20(address _token, address[] calldata _to, uint256[] memory _value) external {
        IERC20 token = IERC20(_token);
        for (uint256 i = 0; i < _to.length; i++) {
            token.transfer(_to[i], _value[i]);
        }
    }
}