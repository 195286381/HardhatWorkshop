// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.25;

/**
 * @title airdrop contract
 * @author zhuzw
 * @notice 
 * 
 * this is a simple airdrop contract
 * 
 */
contract AirDrop {
    function airdrop(address[] calldata _addresses, uint256[] calldata _amounts) external {
        for (uint256 i = 0; i < _addresses.length; i++) {
            payable(_addresses[i]).transfer(_amounts[i]);
        }
    }
}