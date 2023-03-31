import {Box , Image , Flex , HStack,VStack,StackDivider,SimpleGrid,Text} from '@chakra-ui/react';

import nftimage from './images/nftimage.png';
import premiumuserimage from './images/premiumuser.png';
import earntokensimage from './images/earningtokens.png';
import votingimage from './images/votingimage.png';


const FUNCTIONALITY = () => {
   
  

    return (

        <VStack
        divider={<StackDivider borderColor='white' />}
        spacing={2}
        align='stretch'
        >   
          <Box bgGradient='linear(179.4deg, rgb(12, 20, 69) -4%, rgb(71, 30, 84) 290.9%)' height="100%">
              <VStack
                spacing={2}
                align='stretch'
              > 
                <Box  height="500px" p={7}>
                  <HStack spacing="10px" >
                    <Box fontSize="33px" fontFamily=" Papyrus" fontWeight="bold" bgClip='text' width={950} bgGradient='linear(to-r,cyan.100, blue.100)' ml={10} >
                                    Coasta users will have to subscribe to one of the three subscription plans (Essential, Moderate, and Delux). They can subscribe by minting Token by paying some $CT tokens.
                    </Box>
                    <Flex >
                        <Image  src={nftimage} alt="nftimage"  height={500} width={500} ml={220}   />
                    </Flex>
                    
                  </HStack>
                </Box>
                <Box height="500px" p={7}>
                  <HStack spacing="10px" >
                    <Flex >
                        <Image  src={premiumuserimage} alt="nftimage"  height={500} width={500} ml={50}   />
                    </Flex>
                    <Box  fontSize="33px" fontFamily=" Papyrus" fontWeight="bold" bgClip='text' width={1200} bgGradient='linear(to-r,cyan.100, blue.100)'>
                                    <Text ml={200}>
                                      There are some privilages for Delux users. They can create occurrence in three market class (Lifestyle, Matches, and Social) and vote up to 20 vote on different occurrence. 
                                    </Text>
                    </Box>
                  </HStack>

                </Box>
                <Box  height="500px" p={7}>
                  <HStack spacing="10px" >
                    <Box fontSize="33px" fontFamily=" Papyrus" fontWeight="bold" bgClip='text' width={950} bgGradient='linear(to-r,cyan.100, blue.100)' ml={10} >
                    Users who subscribed have different voting power based on their subscription plan and can vote only one time on live occurrences. Delux users who created the occurrence can end it by providing the correct vote (Yes or No) and these occurrence marked as ended.
                    </Box>
                    <Flex >
                        <Image  src={votingimage} alt="nftimage"  height={600} width={600} ml={180}   />
                    </Flex>
                    
                  </HStack>
                </Box>
                
                <Box  height="600px" p={7}>
                  <HStack spacing="10px" >
                    <Flex >
                        <Image  src={earntokensimage} alt="nftimage"  height={500} width={500}  ml={50}   />
                    </Flex>
                    <Box fontSize="33px" fontFamily=" Papyrus" fontWeight="bold" bgClip='text' width={1170} bgGradient='linear(to-r,cyan.100, blue.100)' ml={10} >
                     <Text ml={200} >
                       Coasta users can earn different amount of Coasta tokens ($CT) when they vote correctly on differnet occurrences. Essential users can earn 10 $CT, while Moderate users can earn 20 $CT. On the other hand, Delux users earn 30 $CT tokens.
                      </Text>
                    </Box>
                   
                    
                  </HStack>
               

                </Box>
              </VStack> 
          </Box>
      
      </VStack>
        

    );
};

export default FUNCTIONALITY;