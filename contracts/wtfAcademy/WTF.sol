// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.4;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
contract WTF is ERC20 {
    constructor() ERC20("WTF", "WTF") {
        _mint(msg.sender, 2_100_000_000);
    }

    function mint(uint256 amount) external {
        _mint(msg.sender, amount);
    }
}