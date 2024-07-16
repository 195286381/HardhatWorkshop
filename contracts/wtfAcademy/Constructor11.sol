// SPDX-License-Identifier: SEE LICENSE IN LICENSE
import { console } from 'hardhat/console.sol';
pragma solidity ^0.8.0;
contract Constructor11 {
    address public owner;
    constructor() {
        owner = msg.sender;
    }

    int public count;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function.");
        _;
    }

    function callOnlyOwner() external onlyOwner {
        count++;
        // do something
        console.log("callOnlyOwner");
    }
}