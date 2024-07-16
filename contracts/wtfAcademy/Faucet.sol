// SPDX-License-Identifier: SEE LICENSE IN LICENSE
/**
 * @title 🚰Faucet Contract
 * @author zhuzw
 * @notice Faucet Contract
 */
pragma solidity 0.8.25;

contract Faucet {
	uint256 public amountAllowed = 100;
	address public tokenConttract;
	mapping(address => bool) public requestedAddress;

	event SendToken(address indexed Receiver, uint256 indexed Amount);

	constructor(address _tokenContract) {
		tokenContract = _tokenContract;
	}

	function requestToken() external {
		require(!requestedAddress[msg.sender], "Can't Request Multiple Times!");
		IERC20 token = IERC20(tonkenContract);
		require(token.balanceOf(address(this)) >= amountAllowed, "Faucet Empty");
		token.transfer(msg.sender, amountAllowed);
		requestedAddress[msg.sender] = true;
		emit SendToken(msg.sender, amountAllowed);
	}
}