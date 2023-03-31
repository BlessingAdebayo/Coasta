// SPDX-License-Identifier: MTI
pragma solidity ^0.8.9;

import "./SubPlansTokens.sol";            

contract Coasta {
       SubPlansTokens private subplanstokens;
    address private ContractOwner;
    address private coastatokenaddress;
    uint256 CurrentOccurrenceId;
    mapping (address => mapping (uint256 => uint256)) private HighestVotesPerUsers; 
    mapping (address => mapping (uint256 => bool)) private IsVoted;  
    mapping (address => mapping (uint256 => bool)) private IsCreatedThatOccurrence;
    mapping (uint256 => address []) private UsersVotedYes;  
    mapping (uint256 => address []) private UsersVotedNo;   

    constructor (address _SubPlansTokensAddress , address _CoastaTokenAddress){
        subplanstokens = SubPlansTokens(_SubPlansTokensAddress);
        coastatokenaddress = _CoastaTokenAddress;
        ContractOwner = msg.sender;
    }   
    struct Occurrence {
        address OccurenceCreator;
        uint256 OccurrenceId;
        string OccurrenceName;
        string OccurrenceDescription;
        uint256 OccurrenceClass; 
        uint256 YesVotes;
        uint256 NoVotes;
        bool IsClosed;
    }

    Occurrence []  Occurrences;
 
    function CreateOccurrence (string memory _OccurrenceName , string memory _OccurrenceDescription , uint256 _OccurrenceClass) public {
        address CallerAddress = msg.sender;
        require ( subplanstokens.GetTokensClassOfSpecificUser(CallerAddress) == 3 , "YOu have to be contract owner or delux user to create Occurrence"); 
        CurrentOccurrenceId ++;
        Occurrence memory newoccurrence = Occurrence (msg.sender,CurrentOccurrenceId,_OccurrenceName,_OccurrenceDescription,_OccurrenceClass,0,0,false);
        Occurrences.push(newoccurrence);
        IsCreatedThatOccurrence[msg.sender][CurrentOccurrenceId]= true;

    }

        function CloseOccurrence (uint256 _OccurrenceId, uint256 _OccurrenceRightVote) public {
        require (IsCreatedThatOccurrence[msg.sender][_OccurrenceId] == true , "You can not end that Occurrence, you are not the Occurrence's creator");
        for (uint256 i = 0 ; i <Occurrences.length ; i++){
            Occurrence storage CurrentOccurrence = Occurrences[i];
            if (CurrentOccurrence.OccurrenceId == _OccurrenceId ){
                require (CurrentOccurrence.IsClosed == false , "You can not end an ended Occurrence");
                CurrentOccurrence.IsClosed = true;
            }
        }

        if (_OccurrenceRightVote == 0 ){
            address [] memory usersvotedno = UsersVotedNo[_OccurrenceId];
            for (uint256 i = 0 ; i < usersvotedno.length ; i++ ){
                address UserAddress = usersvotedno[i]; 
                if (subplanstokens.GetTokensClassOfSpecificUser(UserAddress) == 1){
                    IERC20(coastatokenaddress).transfer(UserAddress,10 * 10**18);
                } 
                if (subplanstokens.GetTokensClassOfSpecificUser(UserAddress) == 2){
                    IERC20(coastatokenaddress).transfer(UserAddress,20 * 10**18);
                } 
                if (subplanstokens.GetTokensClassOfSpecificUser(UserAddress) == 3){
                    IERC20(coastatokenaddress).transfer(UserAddress,30 * 10**18);
                }
            }
        }
        
        if (_OccurrenceRightVote == 1 ){
            address [] memory usersvotedyes = UsersVotedYes[_OccurrenceId];
                       for (uint256 i = 0 ; i < usersvotedyes.length ; i++ ){
                address UserAddress = usersvotedyes[i];
                 
                if (subplanstokens.GetTokensClassOfSpecificUser(UserAddress) == 1){
                    IERC20(coastatokenaddress).transfer(UserAddress,10 * 10**18);
                }
               
                if (subplanstokens.GetTokensClassOfSpecificUser(UserAddress) == 2){
                    IERC20(coastatokenaddress).transfer(UserAddress,20 * 10**18);
                }
                 
                if (subplanstokens.GetTokensClassOfSpecificUser(UserAddress) == 3){
                    IERC20(coastatokenaddress).transfer(UserAddress,30 * 10**18);
                }
            }
            
        }
    }

     
    function VoteOnOccurrences (uint256 _OccurrenceId, uint256 _YesOrNo) public {
        address CallerAddress = msg.sender;
        require ( subplanstokens.GetTokensClassOfSpecificUser(CallerAddress) == 1 || subplanstokens.GetTokensClassOfSpecificUser(CallerAddress) == 2 || subplanstokens.GetTokensClassOfSpecificUser(CallerAddress) == 3 , "You need to subscribe on coasta to vote on Occurrence");
        require(IsVoted[msg.sender][_OccurrenceId] == false,"You have voted on that Occurence before");
        for (uint256 i=0 ; i< Occurrences.length ; i++){
            if (Occurrences[i].OccurrenceId == _OccurrenceId){
               require ( Occurrences[i].IsClosed == false ,"the Occurrence is ended");
                Occurrence storage TargetOccurrence = Occurrences[i];
                if (subplanstokens.GetTokensClassOfSpecificUser(CallerAddress) == 1){
                    require(HighestVotesPerUsers[msg.sender][1] <= 5, "Essential user can only vote 5 votes on events");
                    if (_YesOrNo == 0){
                        TargetOccurrence.NoVotes ++ ;
                        UsersVotedNo[_OccurrenceId].push(msg.sender);
                    }
                    if (_YesOrNo == 1){
                        TargetOccurrence.YesVotes ++ ;
                        UsersVotedYes[_OccurrenceId].push(msg.sender);
                    }
              
                    HighestVotesPerUsers[msg.sender][1] ++;
                    
                }
                
                if (subplanstokens.GetTokensClassOfSpecificUser(CallerAddress) == 2){
                    require(HighestVotesPerUsers[msg.sender][2] <= 10, "Moderate user can only vote 10 votes on events");
                    if (_YesOrNo == 0){
                        TargetOccurrence.NoVotes = TargetOccurrence.NoVotes + 2 ;
                        UsersVotedNo[_OccurrenceId].push(msg.sender);
                    }
                    if (_YesOrNo == 1){
                        TargetOccurrence.YesVotes = TargetOccurrence.YesVotes + 2 ;
                        UsersVotedYes[_OccurrenceId].push(msg.sender);
                    }
                    HighestVotesPerUsers[msg.sender][2] ++;
                }
                
                if (subplanstokens.GetTokensClassOfSpecificUser(CallerAddress) == 3){
                    require(HighestVotesPerUsers[msg.sender][1] <= 20, "Delux user can only vote 20 votes on events");
                    if (_YesOrNo == 0){
                        TargetOccurrence.NoVotes = TargetOccurrence.NoVotes + 3 ;
                        UsersVotedNo[_OccurrenceId].push(msg.sender);
                    }
                    if (_YesOrNo == 1){
                        TargetOccurrence.YesVotes = TargetOccurrence.YesVotes + 3  ;
                        UsersVotedYes[_OccurrenceId].push(msg.sender);
                    }
                    HighestVotesPerUsers[msg.sender][3] ++;
                }
            }
        }
        IsVoted[msg.sender][_OccurrenceId] = true;
    }

    function GetAllOccurrences () public view returns (Occurrence [] memory){
        return Occurrences;
    }

}