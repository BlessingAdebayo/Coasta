import {Box , Button , Flex , HStack,VStack,StackDivider,SimpleGrid,Text} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useToast } from '@chakra-ui/react'

import { Link } from "react-router-dom";

const PRICINGPLANS = ({coastatokencontract,subplanstokens}) => {
  const [essentialminting , setessentialminiting] = useState("Mint");
  const [moderateminting , setmoderateminting] = useState("Mint");
  const [deluxminting , setdeluxminting] = useState("Mint");
  const [essentialfees,setessentialfees] = useState();
  const [moderatefees,setmoderatefees] = useState();
  const [deluxfees,setdeluxfees] = useState();
  const [issubscribedessential,setissubscribedessential] = useState();
  const [issubscribedmoderate,setissubscribedmoderate] = useState();
  const [issubscribeddelux,setissubscribeddelux] = useState();


  const toast = useToast();



  useEffect(()=>{
    getsubscribitonfees();
    getmytokenclass();
  },[])

  const getsubscribitonfees = async ()=>{
    const essentialtokenfees = await subplanstokenscontract.GetEssentialMintingFees();
    const moderatetokenfees = await subplanstokenscontract.GetModerateMintingFees();
    const deluxtokenfees = await subplanstokenscontract.GetDeluxMintingFees();
    setessentialfees(essencialtokenfees);
    setmoderatefees(moderatetokenfees);
    setdeluxfees(deluxtokenfees);
  }

  const getmytokenclass = async ()=>{
    const myclass = await subplanstokenscontract.GetTOKENClassOfUser();
    if (Number(myclass) == 1){
      setessentialminiting("Cancel");
      setissubscribedessential(1);
    }
    if (Number(myclass) == 2){
      setmoderateminting("Cancel");
      setissubscribedmoderate(1);
    }
    if (Number(myclass) == 3){
      setdeluxminting("Cancel");
      setissubscribeddelux(1);
    }
 
  }





  const subscribeandcancelessentialplan = async () =>{
    try{
      if (essentialminting === "Mint"){
        if (issubscribedessential == 1){
          toast({
            title: 'Subscription failed',
            description: "Error! You are aleardy in essential plan",
            status: 'error',
            duration: 2600,
            isClosable: true,
            position: 'top-left',   
        });
        }
        else if (issubscribeddelux == 1){
          toast({
            title: 'Subscription failed',
            description: "Error! You are aleardy in delux plan",
            status: 'error',
            duration: 2600,
            isClosable: true,
            position: 'top-left',   
        });
        }
        else {
          const coastaapproval =  await (await coastatokencontract.approve(subplanstokenscontract.address,essentialfees ) ).wait();
          if ( coastaapproval.hash ||coastaapproval.transactionHash){
            toast({
                title: 'Coasta token Aprroval Success',
                description: "Wait for next MetaMask confirmations to complete minting process",
                status: 'success',
                duration: 2600,
                isClosable: true,
                position: 'top-left',   
            });
          }
          const mintessentialtoken =  await (await subplanstokenscontract.MintNFT(1) ).wait();
          if ( mintessentialtoken.hash || mintessential.transactionHash){
            toast({
                title: 'Subscription success',
                description: "Congratulations! You have subscribed to essential plan",
                status: 'success',
                duration: 2600,
                isClosable: true,
                position: 'top-left',   
            });
            
          }
        }
    }
    if(essentialminting==="Cancel"){
      
      const cancelessential =  await (await subplanstokenscontract.CancelCurrentPlan(1) ).wait();
      if ( cancelessential.hash || cancelessential.transactionHash){
        toast({
            title: 'Subscription cancellation success',
            description: " You have canceled your subscription to essential plan",
            status: 'success',
            duration: 2600,
            isClosable: true,
            position: 'top-left',   
        });
        
      }
    }
    }
    catch(error){
      console.log(error)
    }


  }



  const subscribeandcancelmoderateplan = async () =>{
    try{
      if (moderateminting === "Mint"){
        if (issubscribedessential == 1){
          toast({
            title: 'Subscription failed',
            description: "Error! You are aleardy in essential plan",
            status: 'error',
            duration: 2600,
            isClosable: true,
            position: 'top-left',   
        });
        }
        else if (issubscribeddelux == 1){
          toast({
            title: 'Subscription failed',
            description: "Error! You are aleardy in delux plan",
            status: 'error',
            duration: 2600,
            isClosable: true,
            position: 'top-left',   
        });
        }
        else {
          const coastaapproval =  await (await coastatokencontract.approve(subplanstokenscontract.address,moderatefees ) ).wait();
          if ( coastaapproval.hash ||coastaapproval.transactionHash){
            toast({
                title: 'Coasta token Aprroval Success',
                description: "Wait for next MetaMask confirmations to complete minting process",
                status: 'success',
                duration: 2600,
                isClosable: true,
                position: 'top-left',   
            });
          }
          const mintmoderatetoken =  await (await subplanstokenscontract.MintNFT(2) ).wait();
          if ( mintmoderatetoken.hash || mintmoderatetoken.transactionHash){
            toast({
                title: 'Subscription success',
                description: "Congratulations! You have subscribed to moderate plan",
                status: 'success',
                duration: 2600,
                isClosable: true,
                position: 'top-left',   
            });

            
          }
        }
    }
    if (moderateminting === "Cancel"){
      const cancelmoderate=  await (await subplanstokenscontract.CancelCurrentPlan(2) ).wait();
      if ( cancelmoderate.hash || cancelmoderate.transactionHash){
        toast({
            title: 'Subscription cancellation success',
            description: " You have canceled your subscription to moderate plan",
            status: 'success',
            duration: 2600,
            isClosable: true,
            position: 'top-left',   
        });
        
      }
    }
    }
    catch(error){
      console.log(error)
    }
  }



  const subscribeandcanceldeluxplan = async () =>{
    try{
      if (deluxminting === "Mint"){
        if (issubscribedessential == 1){
          toast({
            title: 'Subscription failed',
            description: "Error! You are aleardy in essential plan",
            status: 'error',
            duration: 2600,
            isClosable: true,
            position: 'top-left',   
        });
        }
        else if (issubscribedmoderate == 1){
          toast({
            title: 'Subscription failed',
            description: "Error! You are aleardy in moderate plan",
            status: 'error',
            duration: 2600,
            isClosable: true,
            position: 'top-left',   
        });
        }
        else {
          const coastaapproval =  await (await coastatokencontract.approve(subplanstokenscontract.address,deluxfees ) ).wait();
          if ( coastaapproval.hash ||coastaapproval.transactionHash){
            toast({
                title: 'Coasta token Aprroval Success',
                description: "Wait for next MetaMask confirmations to complete minting process",
                status: 'success',
                duration: 2600,
                isClosable: true,
                position: 'top-left',   
            });
          }
          const mintdeluxtoken =  await (await subplanstokenscontract.MintTOKEN(3) ).wait();
          if ( mintdeluxtoken.hash || mintdeluxtoken.transactionHash){
            toast({
                title: 'Subscription success',
                description: "Congratulations! You have subscribed to delux plan",
                status: 'success',
                duration: 2600,
                isClosable: true,
                position: 'top-left',   
            });
            
          }
        }
    }
      if (deluxminting === "Cancel"){
        const canceldelux=  await (await subplanstokenscontract.CancelCurrentPlan(3) ).wait();
        if ( canceldelux.hash || canceldelux.transactionHash){
          toast({
              title: 'Subscription cancellation success',
              description: " You have canceled your subscription to delux plan",
              status: 'success',
              duration: 2600,
              isClosable: true,
              position: 'top-left',   
          });
          
        }
      }

    }
    catch(error){
      if (error.reason === "execution reverted: ERC20: transfer amount exceeds balance"){
        toast({
            title: 'Minting NFT failed',
            description: "You don't have enough balance of $CT",
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
          <Box bgGradient='linear(179.4deg, rgb(12, 20, 69) -10%, rgb(71, 30, 84) 280%)' height="897px">
                  <VStack
                  divider={<StackDivider borderColor='rgb(12, 20, 69)' />}
                  spacing={2}
                  align='stretch'
                  >  
                  <Box>
                      <Flex justify="center" fontFamily=" Nirmala UI" fontWeight='extrabold' fontSize="77px" bgClip='text'  bgGradient='linear(to-r, cyan.400, red.600)' padding={10}>
                          Subscribe to Predicta by Minting NFTs
                      </Flex>
                  </Box>
            <br></br>
              <Box h="500px" justify="center">
                     
                      <Flex justify="center">

                      <SimpleGrid columns={3} spacingX='40px' spacingY='30px' >
                        <Box  p={3} shadow='lg' borderWidth='3px'  boxSize={350} borderColor="blue.600" >
                          <VStack
                          divider={<StackDivider borderColor='rgb(12, 20, 69)' />}
                          spacing={4}
                          align='stretch'
                          >  
                            <Flex h={8} w="180px" justify="center" >
                              <Text mt={1} fontSize="35px" fontWeight='extrabold' fontFamily=" Nirmala UI" color="blue.300" ml="75%">Basic</Text>
                            </Flex>
                            <Flex h={5} w="320px" justify="center">
                              <Text mt={1} fontSize="22px" color="blue.200" fontWeight="bold">Mint for: 20 $Predicta</Text>
                            </Flex>
                            <Flex h={5} w="320px" justify="center">
                              <Text mt={1} fontSize="19px" color="blue.200" fontWeight="bold">5 Maximum votes</Text>
                            </Flex>
                            <Flex h={8} w="320px" justify="center">
                              <Text mt={1} fontSize="19px" color="blue.200" fontWeight="bold">No events creation</Text>
                            </Flex>
                            <Button 
                              backgroundColor="blue.600"
                              colorScheme='teal' 
                              variant='solid'
                              fontFamily=" Nirmala UI"
                              borderRadius= "100px"
                              width="170px" 
                              height="70px"
                              fontSize={23}
                              ml="25%"
                              onClick={subscribeandcancelessentialplan}
                            >{essentialminting} </Button>
                          </VStack>
                        </Box>



                        <Box  p={3} shadow='lg' borderWidth='3px'  boxSize={350} borderColor="blue.600" >
                          <VStack
                          divider={<StackDivider borderColor='rgb(12, 20, 69)' />}
                          spacing={4}
                          align='stretch'
                          >  
                            <Flex h={8} w="180px" justify="center">
                              <Text mt={1} fontSize="35px" fontWeight='extrabold' fontFamily=" Nirmala UI" color="blue.300" ml="75%">Intermediate</Text>
                            </Flex>
                           <Flex h={5} w="320px" justify="center">
                              <Text mt={1} fontSize="22px" color="blue.200" fontWeight="bold">Mint for: 50 $Predicta</Text>
                          </Flex>
                          <Flex h={5} w="320px" justify="center">
                              <Text mt={1} fontSize="19px" color="blue.200" fontWeight="bold">10 Maximum votes</Text>
                            </Flex>
                          <Flex h={8} w="320px" justify="center">
                              <Text mt={1} fontSize="19px" color="blue.200" fontWeight="bold">No events creation</Text>
                          </Flex>
                            <Button 
                              backgroundColor="blue.600"
                              colorScheme='teal' 
                              variant='solid'
                              fontFamily=" Nirmala UI"
                              borderRadius= "100px"
                              width="170px" 
                              height="70px"
                              fontSize={23}
                              ml="25%"
                              onClick={subscribeandcancelmoderateplan}
                            >{moderateminting}</Button>
                          </VStack>
                        </Box>



                        <Box  p={3} shadow='lg' borderWidth='3px'  boxSize={350} borderColor="blue.600" >
                          <VStack
                          divider={<StackDivider borderColor='rgb(12, 20, 69)' />}
                          spacing={4}
                          align='stretch'
                          >  
                            <Flex h={8} w="180px" justify="center">
                              <Text mt={1} fontSize="35px" fontWeight='extrabold' fontFamily=" Nirmala UI" color="blue.300" ml="75%">Premium</Text>
                            </Flex>
                            <Flex h={5} w="320px" justify="center">
                              <Text mt={1} fontSize="22px" color="blue.200" fontWeight="bold">Mint for: 100 $Predicta</Text>
                            </Flex>
                            <Flex h={5} w="320px" justify="center">
                              <Text mt={1} fontSize="19px" color="blue.200" fontWeight="bold">20 Maximum votes</Text>
                            </Flex>
                          <Flex h={8} w="320px" justify="center">
                              <Text mt={1} fontSize="19px" color="blue.200" fontWeight="bold"> Events creation</Text>
                          </Flex>

                            <Button 
                              backgroundColor="blue.600"
                              colorScheme='teal' 
                              variant='solid'
                              fontFamily=" Nirmala UI"
                              borderRadius= "100px"
                              width="170px" 
                              height="70px"
                              fontSize={23}
                              ml="25%"
                              onClick={subscribeandcanceldeluxplan}
                            >{deluxminting} </Button>
                          </VStack>
                        </Box>


                    

                        

                        

                     
                      </SimpleGrid>
                      </Flex>
              </Box>


             </VStack>          
          </Box>
      
      </VStack>
        

    );
};

export default PRICINGPLANS;
Footer
© 2023 GitHub, Inc.
Footer navigation
Terms
Privacy
Security
Status
Docs
Contact GitHub
Pricing
API
Training
Blog
About

