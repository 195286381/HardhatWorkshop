// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.4;

// solidity 简单继承
contract Yeye {
    function eat() external pure virtual returns(string memory) {
        return "yeye eat";
    }
}

contract Baba is Yeye {
    function eat() external pure virtual override returns(string memory) {
        return "baba eat";
    }
}

contract Erzi is Yeye, Baba {
    function eat() external pure override(Yeye, Baba) returns(string memory) {
        return "erzi eat";
    }
}