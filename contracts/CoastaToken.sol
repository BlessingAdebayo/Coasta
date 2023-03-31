// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract CoastaToken is ERC20{
    constructor () ERC20 ("Coasta Token" , "CT"){}
    function GetSomeCoastaTestTokens (uint256 _amount) public {
        _mint(msg.sender, _amount);

    }
    function GetSomeCoastaTestTokensForUser ( address _UserAddress , uint256 _amount) public {
        _mint(_UserAddress, _amount);
    }
}