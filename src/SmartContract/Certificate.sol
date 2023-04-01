// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
// event URI(string uri, uint256 indexed tokenId);


// import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
// openzeppelin is used keep track of counters 

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";


contract legitCred is ERC721URIStorage {
    
    // event URI(string uri, uint256 indexed tokenId);
   
    uint public count=0;
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("legitCred", "NFT") {}



    function mint(address recipient, string memory metadata) public returns (uint256) {
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        _mint(recipient, newTokenId);
        _setTokenURI(newTokenId, metadata);
        count=count+1;
        return newTokenId;
    }
  
    function getMetaData(uint256 id) public view returns(string memory data){
        return tokenURI(id);
    }
    
    function getCount() public view returns(uint256){
        return count;
    }
}