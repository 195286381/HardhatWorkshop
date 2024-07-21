// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.25;

/**
 * @title english auction contract
 * @author zhuzw
 * @notice 创建一个英式拍卖合约.
 * 
 * 英式拍卖.
 * 1. constructor
 * 2. start func
 * 3. bid func
 * 4. withdraw func
 * 5. end func
 */
contract EnglishAuction {
    // ntf address
    address public nft;
    // nft id
    uint public nftId;
    // start price
    uint256 public startPrice;
}