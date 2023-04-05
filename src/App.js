import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter ,Routes, Route,Link } from "react-router-dom";
import {ethers} from 'ethers';
import { useToast } from '@chakra-ui/react'
import detectZoom from 'detect-zoom';
import Navbar from './pages/navbar.js';
import HOME from './pages/home.js';
import PRICINGPLANS from './pages/pricingplans';
import EXPLOREOCCURRENCES from './pages/explore_occurrences';
import CREATEOCCURRENCES from './pages/create_occurrences.js';
import FUNCTIONALITY from './pages/functionality.js';
import coastatokenabiobject from './ContractsAbi/coastatokenabi.json';
import subplanstokensabiobject from './ContractsAbi/subplanstokensabi.json';
import coastaabiobject from './ContractsAbi/coastaabi.json';


function App() {
  const [accounts , setaccounts] = useState([]);
  const toast = useToast();

  const [coastatokencontract, setcoastatokencontract] = useState({});
  const [subplanstokenscontract, setsubplanstokenscontract] = useState({});
  const [coastacontract, setcoastacontract] = useState({});


  const coastatokenaddress = "0x32513A8C14bDe6a373685235cF7656fE3476C90a";
  const subplanstokensaddress = "0x02D6c8b4cdd3c7efD1f89b15EA2E529DEd3a87a4";
  const coastadappcontractaddress = "0x8438475553c49327A4eb1812ACF55d7c247ce6Fa";


  const  connectwallet = async () => {
    if (window.ethereum) {
        const accounts = await window.ethereum.request ({
            method: "eth_requestAccounts",
        }); 
        const provider = await new ethers.providers.Web3Provider(window.ethereum);
        const signer = await provider.getSigner();
        setaccounts(accounts);
      

        window.ethereum.on('accountsChanged', async function (accounts) {
            setaccounts(accounts[0])
            
            await connectwallet()
          })
          
        connectcoastatokencontract(signer);
        connectsubplanstokenscontract(signer);
        connectcoastacontract(signer);

    

    }
    else {
      toast({
        title: 'Error! MetaMask Not Found',
        description: "You have not installed MetaMask",
        status: 'error',
        duration: 2200,
        isClosable: true,
        position: 'top',   
    });

    }

  }

  const connectcoastatokencontract = async (signer) => {
    const coastatoken = new ethers.Contract(coastatokenaddress,coastatokenabiobject.coastatokenabi,signer);
    setcoastatokencontract(coastatoken);
  }
  //Connect to demo test coins
  //wbtc
  const connectsubplanstokenscontract = async (signer) => {
    const subplanstokens = new ethers.Contract(subplanstokensaddress,subplanstokensabiobject.subplanstokensabi,signer);
    setsubplanstokenscontract(subplanstokens);
  }
  const connectcoastacontract = async (signer) => {
    const coasta = new ethers.Contract(coastadappcontractaddress,coastaabiobject.coastaabi,signer);
    setcoastacontract(coasta);
  }



  return (
    <div>
           
      <BrowserRouter>        
        <div className="App">
          <Navbar accounts={accounts} connectwallet={connectwallet} />
        </div>  
        <Routes>
          <Route path= "/" element={ <HOME accounts={accounts} coastatokencontract={coastatokencontract} subplanstokenscontract={subplanstokenscontract}/>}/>
          <Route path= "/home" element={ <HOME />}/>
          <Route path= "/exploreoccurrences" element={ <EXPLOREOCCURRENCES accounts={accounts} coastacontract ={coastacontract}/>}/>
          <Route path= "/createoccurrences" element={ <CREATEOCCURRENCES accounts={accounts} coastacontract = {coastacontract}/>}/>
          <Route path= "/functionality" element={ <FUNCTIONALITY />}/>
          <Route path= "/pricingplans" element={ <PRICINGPLANS coastatokencontract={coastatokencontract} subplanstokenscontract={subplanstokenscontract} />}/>
          
          
        </Routes>
      </BrowserRouter>
   
      
   
    


    </div>
  );
}

export default App;
