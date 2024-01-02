import React from 'react'
import '../App.css'
import { useNavigate } from 'react-router-dom'
function Login() {
  const navigate = useNavigate();
  
  const connectAccount = ()=>{
    navigate('/tasks');
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