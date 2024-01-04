import React, { useContext, useState } from 'react'
import '../App.css'
import { useNavigate } from 'react-router-dom'
import  {ethers} from 'ethers';
import {contractABI , contractAddress} from '../Constants/constant'
import { ProviderContext } from '../App';


function Login() {
  const navigate = useNavigate();
  const [provider,setProvider] = useState(null);
  const [account,setAccount] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const provider1 = useContext(ProviderContext);
  console.log(provider1);
  
  
  const connectAccount = async ()=>{
    if(window.ethereum)
    {
      try{
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(provider);
        provider1.provider = provider;
        await provider.send("eth_requestAccounts",[]);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        provider1.account = address;
        console.log("MetaMask Connected : " + address);
        setIsConnected(true);
        navigate('/tasks');
      }
      catch(err)
      {
        console.log("Error : " + err);
      }
    }
    else
    {
      console.log("MetaMask not Found");
    }
  }

  return (
    <div className='MainContainer'>
        <h1>Login Page</h1>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ad, laudantium!</p>
        <button onClick={()=>{
          connectAccount();
        }}>Connect your Wallet</button>
    </div>
  )
}

export default Login