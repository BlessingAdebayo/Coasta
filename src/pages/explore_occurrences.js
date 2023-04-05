import {Box , Button , Flex , HStack,VStack,StackDivider,SimpleGrid,Text,Select} from '@chakra-ui/react';
import { useState,useEffect } from 'react';
import { Spinner } from '@chakra-ui/react'
import { Card,Col } from "react-bootstrap";
import { Badge } from '@chakra-ui/react'
import {Menu,MenuButton,MenuList,MenuItem} from '@chakra-ui/react'
import {Modal,ModalOverlay,ModalContent,ModalHeader,ModalFooter,ModalBody,ModalCloseButton, FormControl , FormLabel, Input} from '@chakra-ui/react'

import { IconButton } from '@chakra-ui/react'
import { HamburgerIcon} from '@chakra-ui/icons'
import { useToast } from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'


const EXPLOREEVENTS = ({accounts,coastacontract}) => {
  const iswalletconnected = Boolean(accounts[0]);
  const [allmarketoccurrences,setallmarketoccurrences] = useState([]);
  const [currentoccurrenceid,setcurrentoccurrenceid] = useState();

  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  const exploreoccurrences = async()=> {
    const occurrences = await coastacontract.GetAllOccurrences();
    const occurrenceslength = occurrences.length;
    let alloccurrences = [];
    for (let i = 0 ; i < occurrenceslength ; i++){
        let  occurrenceclasssmarket;
        const occurrencecreator = occurrences[i].OccurenceCreator;
        const occurrenceid = occurrences[i].OccurrenceId;
        const occurrencename = occurrences[i].OccurrenceName;
        const occurrencedescription = occurrences[i].OccurrenceDescription;
        const occurrenceclasss = occurrences[i].OccurrenceClass;
        const occurrenceyesvotes = occurrences[i].YesVotes;
        const occurrencenovotes = occurrences[i].NoVotes;
        let occurrenceisended = occurrences[i].IsClosed;
       
        let occurrenceyespercentage = ((Number(occurrenceyesvotes) / (Number(occurrenceyesvotes) + Number(occurrencenovotes))) *100).toFixed(2);;

        let occurrencenopercentage = ((Number(occurrencenovotes) / (Number(occurrenceyesvotes) + Number(occurrencenovotes))) *100).toFixed(2);;

        if (Number.isNaN(Number(occurrenceyespercentage)) == true){
            occurrenceyespercentage = 0 ;
        }
        if (Number.isNaN(Number(occurrencenopercentage)) == true){
            occurrencenopercentage = 0 ;
        }

        if (Number(occurrenceclasss) == 1){
             occurrenceclasssmarket = "Lifestyle";
        }
        if (Number(occurrenceclasss) == 2){
             occurrenceclasssmarket = "Matches";
        }
        if (Number(occurrenceclasss) == 3){
             occurrenceclasssmarket = "Social";
        }

     
        alloccurrences.push({occurrencecreator : occurrencecreator ,occurrenceid:Number(occurrenceid) , occurrencename:occurrencename , occurrencedescription:occurrencedescription , occurrenceclasss: occurrenceclasssmarket , occurrenceyesvotes: occurrenceyespercentage , occurrencenovotes:occurrencenopercentage , occurrenceisended: occurrenceisended});
    }
    setallmarketoccurrences(alloccurrences);
  }

  const voteonoccurrencesYes = async(occurrenceid)=>{
        try{
            const voteyestx = await (await coastacontract.VoteOnOccurrences(occurrenceid,1)).wait();
            if ( voteyestx.hash || voteyestx.transactionHash){
                toast({
                    title: 'Voting on Occurrence Success',
                    description: "You have voted on occurrence with (Yes) successfully ",
                    status: 'success',
                    duration: 2600,
                    isClosable: true,
                    position: 'top-left',   
                });
            }
        }
        catch(error){
            if (error.reason === "execution reverted: You need to subscribe on coasta to vote on occurrences"){
                toast({
                    title: 'Voting on Occurrence failed',
                    description: "You need to subscribe on coasta to vote on occurrences",
                    status: 'error',
                    duration: 2600,
                    isClosable: true,
                    position: 'top-left',   
                });
            }
            if (error.reason === "execution reverted: You have voted on that occurrence before"){
                toast({
                    title: 'Voting on Occurrence failed',
                    description: "You have voted on that occurrence before",
                    status: 'error',
                    duration: 2600,
                    isClosable: true,
                    position: 'top-left',   
                });
            }
            if (error.reason === "execution reverted: the occurrence is ended"){
                toast({
                    title: 'Voting on Occurrence failed',
                    description: "The occurrence was ended",
                    status: 'error',
                    duration: 2600,
                    isClosable: true,
                    position: 'top-left',   
                });
            }

        }
    }
    
  const voteonoccurrencesNo = async(occurrenceid)=>{
    try{
        const votenotx = await (await coastacontract.VoteOnOccurrences(occurrenceid,0)).wait();
        if ( votenotx.hash || votenotx.transactionHash){
            toast({
                title: 'Voting on Occurrence Success',
                description: "You have voted on occurrence with (No) successfully ",
                status: 'success',
                duration: 2600,
                isClosable: true,
                position: 'top-left',   
            });
        }
    }
    catch(error){
        if (error.reason === "execution reverted: You need to subscribe on coasta to vote on occurrences"){
            toast({
                title: 'Voting on Occurrence failed',
                description: "You need to subscribe on coasta to vote on occurrences",
                status: 'error',
                duration: 2600,
                isClosable: true,
                position: 'top-left',   
            });
        }
        if (error.reason === "execution reverted: You have voted on that occurrence before"){
            toast({
                title: 'Voting on Occurrence failed',
                description: "You have voted on that occurrence before",
                status: 'error',
                duration: 2600,
                isClosable: true,
                position: 'top-left',   
            });
        }
        if (error.reason === "execution reverted: the occurrence is ended"){
            toast({
                title: 'Voting on Occurrence failed',
                description: "The occurrence was ended",
                status: 'error',
                duration: 2600,
                isClosable: true,
                position: 'top-left',   
            });
        }

    }
    }
 

 

 

  const endoccurrences = async (occurrenceid) =>{
    try {

        const yesornoending = document.getElementById("chooseyesornoending");
        var correctvote = yesornoending.options[yesornoending.selectedIndex].value;
        if (correctvote === "yes"){
            const endoccurrenceyestx = await (await coastacontract.CloseOccurrence(occurrenceid,1)).wait();
            if ( endoccurrenceyestx.hash || endoccurrenceyestx.transactionHash){
                toast({
                    title: 'End Occurrence success',
                    description: "You have ended the occurrence with Yes correct vote ",
                    status: 'success',
                    duration: 2600,
                    isClosable: true,
                    position: 'top-left',   
                });
            }

        }
        if (correctvote === "no"){
            const endoccurrenceynotx = await (await coastacontract.CloseOccurrence(occurrenceid,0)).wait();
            if ( endoccurrenceynotx.hash || endoccurrenceynotx.transactionHash){
                toast({
                    title: 'End Occurrence success',
                    description: "You have ended the occurrence with No correct vote ",
                    status: 'success',
                    duration: 2600,
                    isClosable: true,
                    position: 'top-left',   
                });
            }

        }
        exploreoccurrences();


    }
    catch (error){
        
        if (error.reason === "execution reverted: You could not end that occurrence, you are not the occurrence's creator"){
            toast({
                title: 'Ending occurrence failed',
                description: "You are not the occurrence creator",
                status: 'error',
                duration: 2600,
                isClosable: true,
                position: 'top-left',   
            });
        }
    }
  }

  useEffect(()=>{
    exploreoccurrences();
  
  },[]);



    return (

        <VStack
        divider={<StackDivider borderColor='white' />}
        spacing={2}
        align='stretch'
        >   
          <Box bgGradient='linear(179.4deg, rgb(12, 20, 69) -5%, rgb(71, 30, 84) 290.9%)' height="3000px" p={10}>
          { iswalletconnected ? (
            
                        <Flex padding={3} >
                                 <VStack
        divider={<StackDivider borderColor='white' />}
        spacing={2}
        align='stretch'
        > 
        <Flex>
    
                            {  allmarketoccurrences.length > 0 ? (
                                <SimpleGrid columns={4} spacingX='75px' spacingY='25px'>
                                    { allmarketoccurrences.map((occurrence,idx) => (
                                        <Col >
                                                <br></br>
                                                p
                                                <Box  border="2px" borderColor='blue.500' borderRadius="15px" padding={4} pb={1}  width="400px" height="430px">
                                                    <Card key={idx}   >
                                                        <VStack
                                                        divider={<StackDivider borderColor='rgb(12, 20, 70)' />}
                                                        spacing={1}
                                                        align='stretch'
                                                        >

                                                        <Card.Body ml="150px">
                                                            <Box height="40px">
                                                                <Card.Title>
                                                                    <HStack >
                                                                        <Box width={500}>
                                                                            <Text fontSize={20} ml="15px" fontWeight="bold" color="blue.200"> {occurrence.occurrencename} 
                                                                            </Text>
                                                                        </Box>
                                                                        {
                                                                            occurrence.occurrenceisended ? (
                                                                        
                                                                        <Box>
                                                                            <Badge  fontSize={16} variant='outline' colorScheme='red'>
                                                                                Ended
                                                                            </Badge>
                                                                        </Box>
                                                                        )
                                                                        : (
                                                                            <Box>
                                                                                <Badge  fontSize={16} variant='outline' colorScheme='green'>
                                                                                    Live
                                                                                </Badge>
                                                                            </Box>
                                                                        )
                                                                        }
                                                                        <Menu >
                                                                            <MenuButton
                                                                                as={IconButton}
                                                                                aria-label='Options'
                                                                                icon={<HamburgerIcon />}
                                                                                color="blue.300"
                                                                                bgColor="rgb(12, 20, 70)"
                                                                                colorScheme="blue"
                                                                              
                                                                            />
                                                                            <MenuList bgColor="rgb(12, 20, 70)">
                                                                                <MenuItem as={Button}
                                                                                fontSize={20}
                                                                                bgColor="rgb(12, 20, 70)"
                                                                                color="blue.100"
                                                                                
                                                                                colorScheme='grey' 
                                                                                variant='solid'
                                                                                onClick={ ()=>{               
                                                                                    setcurrentoccurrenceid(occurrence.occurrenceid);
                                                                                    onOpen();
                                                                                }} >
                                                                                    End Occurrence
                                                                                </MenuItem>
                     
                                                                            </MenuList>
                                                                            
                                                                        </Menu>

 
      
                                                                    </HStack>
                                                                </Card.Title>
                                                            </Box>
                                                            <Card.Text>
                                                                <Box height="70px" width="350px">
                                                                    <Text  fontSize={20}  ml="15px"  color="blue.200">
                                                                        {occurrence.occurrencedescription}
                                                                    </Text>
                                                                </Box>
                                                                                                                        

                                                                <Box height="40px" width="320px">
                                                                    <Text  fontSize={20}  ml="15px"  color="blue.200">
                                                                        Class: {occurrence.occurrenceclasss}
                                                                    </Text>
                                                                </Box>
                                                                <Box height="40px" width="320px">
                                                                    <Text  fontSize={20}  ml="15px"  color="blue.200">
                                                                        Yes Votes: {occurrence.occurrenceyesvotes} %
                                                                    </Text>
                                                                </Box>
                                                                <Box height="45px" width="320px">
                                                                    <Text  fontSize={20}  ml="15px"  color="blue.200">
                                                                        No Votes: {occurrence.occurrencenovotes} %
                                                                    </Text>
                                                                </Box>
                                                                <Box height="45px" width="320px">
                                                                    <Text  fontSize={20}  ml="15px"  color="blue.200">
                                                                        Creator: {occurrence.occurrencecreator.slice(0, 5) + '...' + occurrence.occurrencecreator.slice(38, 42)}
                                                                    </Text>
                                                                </Box>
                                                          
                                                          
                                                            </Card.Text>                                                       
                                                        </Card.Body>
                                                       
                                                        <Card.Footer>

                                                          
                                                            
                                                            <Flex justify="center">
                                                            <HStack spacing={10}>
                                                                <Button 
                                                                    backgroundColor="blue.700"
                                                                    fontWeight='bold'
                                                                    textColor="cyan.100"
                                                                    colorScheme='blue' 
                                                                    variant='solid'
                                                                    borderRadius= "30px"
                                                                    width="150px"
                                                                    height="75px"
                                                                    fontSize={30}
                                                                    onClick={ ()=>{
                                                                        voteonoccurrencesYes(occurrence.occurrenceid)
                                                                        

                                                                    }
                                                                        }
                                                                    >Yes
                                                                </Button>
                                                                
                                                                <Button 
                                                                    backgroundColor="blue.700"
                                                                    fontWeight='bold'
                                                                    textColor="cyan.100"
                                                                    colorScheme='blue' 
                                                                    variant='solid'
                                                                    borderRadius= "30px"
                                                                    width="150px"
                                                                    height="75px"
                                                                    fontSize={30}
                                                                    onClick={ ()=>{
                                                                        voteonoccurrencesNo(occurrence.occurrenceid)
                                                                        

                                                                    }
                                                                        }
                                                                    >No
                                                                </Button>
                                                                </HStack>
                                                            </Flex>
                                                        
                                                             
                                                            
                                                         
                                                            
                                                            
                                                        </Card.Footer>
                                                        
                                                        <br></br>
                                                        
                                                        </VStack>
                                                    </Card>
                                                    
                                                </Box>
                                                
                                        </Col>
                                        
                                    ))}
                                    
                                    <Modal isOpen={isOpen} onClose={onClose} size="lg"  >
                                        <ModalOverlay />
                                        <ModalContent>
                                        <ModalHeader  fontSize={22} fontWeight="bold">End Occurrence</ModalHeader>
                                        <ModalCloseButton />
                                        <ModalBody>
                                            <VStack
                                            divider={<StackDivider borderColor='azure' />}
                                            spacing={4}
                                            align='stretch'
                                            >
                                          
                                            <Box h='80px' bg='white'>
                                                <FormLabel  fontSize={25} > Correct Vote</FormLabel>
                                                <HStack spacing='24px'>
                                                    <Box w='350px' h='60px' bg='white'>
                                                        <Select id="chooseyesornoending" fontSize={21} height="65px" width="465px" borderWidth={2} borderColor="black" color="black"    >
                                                            <option value="" disabled selected hidden>Choose correct vote</option>
                                                            <option  value='yes'  > Yes</option>
                                                            <option value='no'>No</option>
        
                                                        </Select>
                                                    </Box>
                                                
                                                
                                                </HStack>
                   
                        
                                                
                                            </Box>
                        
                                            <Box bg='white' mt={5}>
                                                <Button 
                                                backgroundColor="blue.700"
                                                fontWeight='extrabold'
                                                fontSize="26px"
                                                colorScheme='blue' 
                                                variant='solid'
                                                borderRadius= "100px"
                                                width="140px"
                                                height="75px"
                                                ml="165px"
                                                
                                                type="submit"
                                                onClick={ ()=>{
                                                    endoccurrences(currentoccurrenceid)

                                                }
                                                    }
                                            
                                                
                                                
                                                >End
                                                </Button>
                                            

                                            </Box>

                                        </VStack>


                                        </ModalBody>

                                        <ModalFooter >
                                            <Button colorScheme='blue' backgroundColor="blue.700" mr={3} onClick={onClose}>
                                            Close
                                            </Button>
                                        </ModalFooter>
                                        </ModalContent>
                                    </Modal>
                                </SimpleGrid>
                                
                                
                        ): (

                                <VStack
                                divider={<StackDivider  borderColor='rgb(12, 20, 70)' />}
                                spacing={1}
                                align='stretch'
                                >
                                    <Flex justify="center"  fontWeight='extrabold'fontSize="58px" fontFamily=" Papyrus"   ml ={780} bgClip='text' bgGradient='linear(to-r,blue.400, cyan.100)' padding={50} >
                                        Loading..
                                    </Flex>

                                    <Flex justify="center" fontWeight='extrabold' fontSize="43px" ml={320} bgClip='text'  bgGradient='linear(to-r, cyan.800, pink.800,cyan.800,)'   >
                                    <Spinner
                                        thickness='4px'
                                        speed='0.65s'
                                        emptyColor='cyan.200'
                                        color='blue.800'
                                        size='xl'
                                        ml={430}
                                       
                                        />
                                    </Flex>

                                 
                                </VStack>
                        )
                        }
                        </Flex>
   
                        </VStack>
                         </Flex>
                         
                         
                    ) : (
                        
                        <Flex  justify="center"  fontSize="50px" fontFamily=" Papyrus" fontWeight="bold" bgClip='text' bgGradient='linear(to-r,blue.400, cyan.100)' padding={100} >
                            Connect Wallet to view  Occurrences
                        </Flex>
    
     
                    )
                
                
                    }           
                
                    
              
            

                        
          </Box>
      
      </VStack>
        

    );
};

export default EXPLOREEVENTS;