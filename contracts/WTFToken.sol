// SPDX-License-Identifier: MIT
pragma solidity 0.8.25;



contract WTF is ERC721, IERC721Metadata {
    constructor(string memory name_, string memory symbol_) ERC721(name_, symbol_) {
        _mint(msg.sender, 1);
    }
    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        return "https://wtftoken.com/";
    }
}