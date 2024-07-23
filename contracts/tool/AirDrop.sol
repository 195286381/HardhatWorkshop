// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/**
 * @title Airdrop Contract
 * @author zhuzw
 * @notice This is a simple airdrop contract used for transferring ETH or ERC20 tokens.
 */
contract AirDrop {
    // Tracks accounts that have failed transfers.
    mapping(address => uint) private failTransferList;

    // Summation function for arrays.
    function getSum(uint256[] calldata _arr) internal pure returns(uint sum) {
        for(uint i = 0; i < _arr.length; i++)
            sum += _arr[i];
    }

    /// @notice Transfers ERC20 tokens to multiple addresses. Requires approval before use.
    /// @param _token Address of the ERC20 token to transfer.
    /// @param _addresses Array of addresses to airdrop.
    /// @param _amounts Array of token amounts for each address.
    function multiTransferToken(
        address _token,
        address[] calldata _addresses,
        uint256[] calldata _amounts
    ) external {
        // Ensure _addresses and _amounts arrays have equal lengths.
        require(_addresses.length == _amounts.length, "Lengths of Addresses and Amounts NOT EQUAL");
        IERC20 token = IERC20(_token);
        uint _amountSum = getSum(_amounts);
        // Ensure approved token amount is greater than or equal to the total airdrop amount.
        require(token.allowance(msg.sender, address(this)) >= _amountSum, "Need Approve ERC20 token");

        // Transfer tokens using transferFrom.
        for (uint8 i; i < _addresses.length; i++) {
            token.transferFrom(msg.sender, _addresses[i], _amounts[i]);
        }
    }

    /// Transfers ETH to multiple addresses.
    /// Ensure the sent ETH is no less than the total airdrop amount.
    function multiTransferETH(
        address payable[] calldata _addresses,
        uint256[] calldata _amounts
    ) public payable {
        // Ensure _addresses and _amounts arrays have equal lengths.
        require(_addresses.length == _amounts.length, "Lengths of Addresses and Amounts NOT EQUAL");
        uint _amountSum = getSum(_amounts);
        // Ensure the sent ETH equals the total airdrop amount.
        require(msg.value == _amountSum, "Transfer amount error");
        // Send ETH using low-level call.
        for (uint256 i = 0; i < _addresses.length; i++) {
            // Note: The commented code has DoS attack risks and the transfer method is not recommended.
            // DoS attack details can be found at https://github.com/AmazingAng/WTF-Solidity/blob/main/S09_DoS/readme.md
            // _addresses[i].transfer(_amounts[i]);
            (bool success, ) = _addresses[i].call{value: _amounts[i]}("");
            if (!success) {
                failTransferList[_addresses[i]] = _amounts[i];
            }
        }
    }

    // Allows active withdrawal for failed airdrops.
    function withdrawFromFailList(address _to) public {
        uint failAmount = failTransferList[msg.sender];
        require(failAmount > 0, "You are not in the failed list");
        failTransferList[msg.sender] = 0;
        (bool success, ) = _to.call{value: failAmount}("");
        require(success, "Fail withdraw");
    }
}