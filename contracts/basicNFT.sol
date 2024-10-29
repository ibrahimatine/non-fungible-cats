// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract basicNFT {
    string public name;
    uint256 public totalSupply = 0;
    
    mapping(uint256 => address) public tokenOwners;
    mapping(uint256 => string) private tokenURIs;
    
    constructor(string memory _name) {
        name = _name;
    }

    function ownerOf(uint256 tokenId) public view returns (address) {
        return tokenOwners[tokenId];
    }

    function tokenURI(uint256 tokenId) public view returns (string memory) {
        return tokenURIs[tokenId];
    }

    function mint(string memory _tokenURI) public {
        uint256 tokenId = totalSupply;
        tokenOwners[tokenId] = msg.sender;
        tokenURIs[tokenId] = _tokenURI;
        totalSupply += 1;
    }

    function transfer(uint256 tokenId, address to) public {
        require(tokenOwners[tokenId] == msg.sender, "You are not the owner");
        tokenOwners[tokenId] = to;
    }
}
