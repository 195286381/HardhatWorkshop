// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.24;

import { ERC20 } from '@openzeppelin/contracts/token/ERC20/ERC20.sol';
/**
 * @title Moon Token 
 * @author zhuzw
 * @notice test erc20 token just
 */
contract MT is ERC20 {
    constructor() ERC20('Moon Token', 'MT') {
        _mint(msg.sender, 1000000 * 10 ** 18);
    }
}