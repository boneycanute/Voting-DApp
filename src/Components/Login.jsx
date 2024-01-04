import React, { useContext, useState } from 'react'
import '../App.css'
import { useNavigate } from 'react-router-dom'
import  {ethers} from 'ethers';


function Login() {
  const navigate = useNavigate();
  const [provider,setProvider] = useState(null);
  const [account,setAccount] = useState(null);
  
  const connectAccount = async ()=>{
    if(window.ethereum)
    {
      try{
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(provider);
        await provider.send("eth_requestAccounts",[]);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        console.log("MetaMask Connected : " + address);
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
        <p>Transparent Voting: Decentralized, Secure, and Trustworthy Decision-Making on the Blockchain</p>
        <button onClick={()=>{
          connectAccount();
        }}>Connect your Wallet</button>
    </div>
  )
}

export default Login