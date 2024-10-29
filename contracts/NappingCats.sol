// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./basicNFT.sol";

contract NappingCats is basicNFT {
    uint256 public initialPrice;
    mapping(uint256 => uint256) public tokenPrices;
    mapping(uint256 => bool) public listedForSale;

    constructor(string memory _name, uint256 _initialPrice) basicNFT(_name) {
        initialPrice = _initialPrice;
        
        // Instantiation des trois premiers chats
        mint("ipfs://bafkreiepz3jce7hipjtiyiz7u5n3f73kzqvkzcjxsovohbzqugmy5lpbkq/0.json");  // URI pour le chat 0
        mint("ipfs://bafkreihnonxz2bkss4migee326irivypso7fkcyd6fy4l4b6dt56gehhdy/1.json");  // URI pour le chat 1
        mint("ipfs://bafkreictxtbnu6mvaag5i5beikejuko3r324e2nm7pfodllb7snmrs2vui/2.json");  // URI pour le chat 2
    }

    function listToken(uint256 tokenId, uint256 price) public {
        require(tokenOwners[tokenId] == msg.sender, "You are not the owner");
        tokenPrices[tokenId] = price;
        listedForSale[tokenId] = true;
    }

    function buyToken(uint256 tokenId) public payable {
        require(listedForSale[tokenId], "Token is not listed for sale");
        
        uint256 price = tokenPrices[tokenId] > 0 ? tokenPrices[tokenId] : initialPrice;
        require(msg.value >= price, "Insufficient funds");

        // Transfert de propriété
        address previousOwner = tokenOwners[tokenId];
        tokenOwners[tokenId] = msg.sender;

        // Paiement à l'ancien propriétaire
        payable(previousOwner).transfer(msg.value);
        
        // Réinitialisation de l’état du token après l’achat
        listedForSale[tokenId] = false;
        tokenPrices[tokenId] = 0;
    }

  
}
