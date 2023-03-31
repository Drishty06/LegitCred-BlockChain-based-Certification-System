pragma solidity ^0.8.0;
// event URI(string uri, uint256 indexed tokenId);


import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
// openzeppelin is used keep track of counters 

contract MyNFT is ERC721 {
    // event URI(string uri, uint256 indexed tokenId);
    mapping (string => string) private _tokenURIs;

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("MyNFT", "NFT") {}
    event Deposit(uint256 newTokenId);
    

    function mint(address recipient, string memory metadata, string memory uuid) public returns (uint256) {
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        _mint(recipient, newTokenId);
        _setTokenURI(newTokenId, metadata, uuid);

        emit Deposit(newTokenId);
        return newTokenId;
    }
    function _setTokenURI(uint256 tokenId, string memory uri, string memory uuid) public {
        require(_exists(tokenId), "ERC721Metadata: URI set of nonexistent token");
        _tokenURIs[uuid] = uri;
        // _uuid[uuid] = uri;
    }

    function getMetaData(string memory uuid) public view returns (string memory){
       return _tokenURIs[uuid];
    }
}

