// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleStorage {
	string private message;
    address public owner;

	constructor() {
		message = "chainlink workshop";
        owner = msg.sender;
	}

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    event MessageChanged(string newMessage);

	// view is free consume, no gas required
	function getMessage() external view returns(string memory) {
		return message;
	}

    // set message to new value
    // only owner can call this method
    function setMessage(string memory _message) external onlyOwner {
        message = _message;
        emit MessageChanged( _message);
    }
}