// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract CoastaSubPlansTokens is 
    ERC721URIStorage
    {
    string private DeluxTokenURI;
    string private ModerateTokenURI;
    string private EssentialTokenURI;
    //coasta token address
    address CoastaTokenAddress;

    // Minting Fees
    uint256 EssentialMintingFees = 10 * 10**18;
    uint256 ModerateMintingFees = 25 * 10**18;
    uint256 DeluxMintingFees = 50 * 10**18;

    mapping (uint256 => string) private TokensClassesNames; 
    mapping (address => uint256) private TokensOwnedPerUser; 
    mapping (address => mapping (uint256 => uint256)) private MaxPerClassOfOneUser; 
    mapping (uint256 => uint256) private CountUsersPerClass;
    mapping (address => uint256) private OwnedTokens; 
    uint256 currentTokensid;
    constructor (string memory _classone, string memory _classtwo , string memory _classthree , address _CoastaTokenAddress ) ERC721 ("TokenAuthenticationAuthorization","TAA"){
        TokensClassesNames[1] = _classone;  
        TokensClassesNames[2] = _classtwo; 
        TokensClassesNames[3] = _classthree; 
        EssentialTokenURI= "https://ipfs.io/ipfs/bafyreiebj6o3hfslbiwwb6gofhbe6p6qk7plhqpn4xxxftnnlxd7vccyam/metadata.json";
        ModerateTokenURI= "https://ipfs.io/ipfs/bafyreihntmxssaalewqqqvj2aq7hsoimyari2zlsjb5qnajuf6obf3rkn4/metadata.json";
        DeluxTokenURI= "https://ipfs.io/ipfs/bafyreigfobdkn6a2idrbaqs2vyhuvvdvdlbsbl2bpard3lnz7hv2v7htx4/metadata.json";
        CoastaTokenAddress = _CoastaTokenAddress;
    }

    // Minting Tokens function
    function MintTokens (uint256 _classid) public {
        require (_classid >= 1 && _classid <=3,"Wrong class id");
        currentTokensid ++;
        
        if (_classid == 1){
            require (MaxPerClassOfOneUser[msg.sender][2] == 0 && MaxPerClassOfOneUser[msg.sender][3] == 0 , "You have already in another plan, why you need the Essential ?");
            require(MaxPerClassOfOneUser[msg.sender][1] < 1 , "User should have one token per class (Essential)");
            IERC20(CoastaTokenAddress).transferFrom(msg.sender, address(this), EssentialMintingFees);
            _safeMint(msg.sender, currentTokensid);
            _setTokenURI(currentTokensid, EssentialTokenURI);
            TokensOwnedPerUser[msg.sender] = 1;
            OwnedTokens[msg.sender] = currentTokensid;
            MaxPerClassOfOneUser[msg.sender][1] ++;
            CountUsersPerClass[1] ++;
        } 
        
        if (_classid == 2){
            require (MaxPerClassOfOneUser[msg.sender][1] == 0 && MaxPerClassOfOneUser[msg.sender][3] == 0 , "You have already in another plan, why you need the Moderate ?");
            require(MaxPerClassOfOneUser[msg.sender][2] < 1 , "User should have one Token per class (Moderate)");
            IERC20(CoastaTokenAddress).transferFrom(msg.sender, address(this), ModerateMintingFees);
            _safeMint(msg.sender, currentTokensid);
            _setTokenURI(currentTokensid, ModerateTokenURI);
            TokensOwnedPerUser[msg.sender] = 2;
            OwnedTokens[msg.sender] = currentTokensid;
            MaxPerClassOfOneUser[msg.sender][2] ++;
            CountUsersPerClass[2] ++;
        } 
        // Premium
        if (_classid == 3){
            require (MaxPerClassOfOneUser[msg.sender][1] == 0 && MaxPerClassOfOneUser[msg.sender][2] == 0 , "You have already in another plan, why you need the Delux ?");
            require(MaxPerClassOfOneUser[msg.sender][3] < 1 , "User should have one Token per class (Delux)");
            IERC20(CoastaTokenAddress).transferFrom(msg.sender, address(this), DeluxMintingFees);
            _safeMint(msg.sender, currentTokensid);
            _setTokenURI(currentTokensid, DeluxTokenURI);
            TokensOwnedPerUser[msg.sender] = 3;
            OwnedTokens[msg.sender] = currentTokensid;
            MaxPerClassOfOneUser[msg.sender][3] ++;
            CountUsersPerClass[3] ++;
        } 
    }

    
    function TerminateCurrentPlan (uint256 _classid) public {
        
        if (_classid == 1){
            require(TokensOwnedPerUser[msg.sender] == _classid , "you do not own basic nft");
            uint256 ownedtokeid = GetMyTokensTokenId();
            _burn(ownedtokeid);
            delete TokensOwnedPerUser[msg.sender];
            delete OwnedTokens[msg.sender];
            MaxPerClassOfOneUser[msg.sender][1] --;
            CountUsersPerClass[1] --;
        } 
        
        if (_classid == 2){
            require(TokensOwnedPerUser[msg.sender] == _classid , "you do not own intermediate nft");
            uint256 ownedtokeid = GetMyTokensTokenId();
            _burn(ownedtokeid);
            delete TokensOwnedPerUser[msg.sender];
            delete OwnedTokens[msg.sender];
            MaxPerClassOfOneUser[msg.sender][2] --;
            CountUsersPerClass[2] --;
        }
         
        if (_classid == 3){
            require (TokensOwnedPerUser[msg.sender] == _classid , "you do not own premium nft");
            uint256 ownedtokeid = GetMyTokensTokenId();
            _burn(ownedtokeid);
            delete TokensOwnedPerUser[msg.sender];
            delete OwnedTokens[msg.sender];
            MaxPerClassOfOneUser[msg.sender][3] --;
            CountUsersPerClass[3] --;
        } 
    }
    
    function GetTokensClassOfUser () public view returns (uint256){
        return TokensOwnedPerUser[msg.sender];
    } 

    function GetTokensClassOfSpecificUser(address _UserAddress) public view returns (uint256){
        return TokensOwnedPerUser[_UserAddress];
    }

    function GetMyTokensTokenId () public view returns (uint256){
        return OwnedTokens[msg.sender];
    } 
     
    function GetClassName (uint256 _classid) public view returns (string memory){
        return TokensClassesNames[_classid];
    }

    function GetEssentialMintingFees () public view returns (uint256){
        return EssentialMintingFees;
    }
    
    function GetModerateMintingFees () public view returns (uint256){
        return ModerateMintingFees;
    }
      
    function GetDeluxMintingFees () public view returns (uint256){
        return DeluxMintingFees;
    }

}