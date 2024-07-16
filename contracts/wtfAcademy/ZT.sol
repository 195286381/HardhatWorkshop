// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.5;
import { ERC20 } from '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import { Ownable } from '@openzeppelin/contracts/access/Ownable.sol';
/**
 * @title smart contract ERC20
 * @author zhuzhiwei
 * @notice 
 */
contract ZT is ERC20, Ownable {
    constructor() ERC20("ZT", "z token") Ownable(msg.sender) {
    }

    function mint(address account, uint256 amount) onlyOwner external returns (bool) {
        _mint(account, amount);
        return true;
    }
}