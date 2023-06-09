import {Box , Button , Flex , FormLabel,VStack,StackDivider,Container,Input,FormControl,Select,Text} from '@chakra-ui/react';
import {Alert,AlertIcon,AlertTitle,AlertDescription} from '@chakra-ui/react'
import { useState ,useEffect} from 'react';
import { useToast } from '@chakra-ui/react'


const CREATEOCCURRENCES = ({accounts,coastacontract}) => {
    const iswalletconnected = Boolean(accounts[0]);
    const toast = useToast(); 

    useEffect(() => {
      
        if (iswalletconnected == false) {
            toast({
                title: 'Connect Wallet',
                description: "You have to Connect your MetaMask Wallet to create occurrences",
                status: 'info',
                duration: 2400,
                isClosable: true,
                position: 'top',   
              });
            

        }
      }, [])

    const createoccurrences = async ()=>{
        try{
            const occurrencename = document.getElementById('occurrencename').value;
            const occurrencedescription = document.getElementById('occurrencedescription').value;
            const classs = document.getElementById("chooseoccurrenceclasss");
            var classsname = classs.options[classs.selectedIndex].value;
            // Lifestyle classs
            if (classsname === "lifestyle"){
                const createlifestyletx = await (await coastacontract.CreateOccurrence(occurrencename,occurrencedescription,1)).wait();
                if ( createlifestyletx.hash ||createlifestyletx.transactionHash){
                    toast({
                        title: 'Creating Occurrence success',
                        description: "You have created occurrence successfully ",
                        status: 'success',
                        duration: 2600,
                        isClosable: true,
                        position: 'top-left',   
                    });
                
                }

            }

            // Matches classs
            if (classsname === "matches"){
                const creatematchestx = await (await coastacontract.CreateOccurrence(occurrencename,occurrencedescription,2)).wait();
                if ( creatematchestx.hash ||creatematchestx.transactionHash){
                    toast({
                        title: 'Creating Occurrence success',
                        description: "You have created occurrence successfully ",
                        status: 'success',
                        duration: 2600,
                        isClosable: true,
                        position: 'top-left',   
                    });
                
                }
                
            }

            // Social classs
            if (classsname === "social"){
                    const createsocialtx = await (await coastacontract.CreateOccurrence(occurrencename,occurrencedescription,3)).wait();
                    if ( createsocialtx.hash ||createsocialtx.transactionHash){
                        toast({
                            title: 'Creating Occurrence success',
                            description: "You have created occurrence successfully ",
                            status: 'success',
                            duration: 2600,
                            isClosable: true,
                            position: 'top-left',   
                        });
                    
                    }
                    
                
                
            }
        }
        catch(error){
            if (error.reason === "execution reverted: YOu have to be contract owner or delux user to create occurrences"){
                toast({
                    title: 'Creating Occurrence failed',
                    description: "You are not delux user!",
                    status: 'error',
                    duration: 2600,
                    isClosable: true,
                    position: 'top-left',   
                });
            }
        }
    }


    return (

        <VStack
        divider={<StackDivider borderColor='white' />}
        spacing={2}
        align='stretch'
        >   
          <Box bgGradient='linear(179.4deg, rgb(12, 20, 69) -5%, rgb(71, 30, 84) 225.9%)' height="897px">
            <br></br> <br></br> <br></br> <br></br> <br></br>
          <Container  border='1px'  height="580px" borderWidth={3} borderColor="blue.600" borderRadius= "30px">
                <FormControl justify="center"  >
                    <br></br>
                    <FormLabel htmlfor= "occurrencename" color="blue.400"  fontSize="24px" fontWeight="bold" >Name</FormLabel>
                    <Input id = "occurrencename" color="blue.200" type='text' maxLength="20" placeholder="Occurrence name" variant='outline' borderWidth={2} borderColor="blue.800" fontSize={22}   height="60px"   />
                    <br></br><br></br>
                    <FormLabel htmlfor= "occurrencedescription"  color="blue.400"  fontSize="24px" fontWeight="bold" >Description</FormLabel>
                    <Input id = "occurrencedescription" type='text' color="blue.200" maxLength="65"  borderWidth={2} borderColor="blue.800" placeholder="Occurrence description" height="90px" variant='outline' fontSize={22}/>
                    <br></br><br></br>
                    
                    <FormLabel  htmlfor= "occurrenceclasss" color="blue.400"  fontSize="24px" fontWeight="bold">Class</FormLabel>
                    <Select id="chooseoccurrenceclasss" fontSize={20} height="60px" width="485px" borderWidth={2} borderColor="blue.800" color="blue.500"    >
                                    
                                    <option value="" disabled selected hidden>Choose Occurrence Class</option>
                                    <option  value='lifestyle'  > Lifestyle</option>
                                    <option value='matches'>Matches</option>
                                    <option value='social'>Social</option>
                                  
                    </Select>
                    <br></br>
          
                    <br></br>
                    <Flex justify="center">
                        <Button 
                            backgroundColor="blue.700"
                            fontWeight='extrabold'
                            colorScheme='blue' 
                            variant='solid'
                            borderRadius= "30px"
                            width="230px"
                            height="90px"
                            fontSize={30}
                        
                            type='submit'
                            onClick={createoccurrences}
                            
                            >Create Occurrence
                        </Button>
                    </Flex>


                </FormControl>
            </Container>
                       
          </Box>
      
      </VStack>
        

    );
};

export default CREATEOCCURRENCES;