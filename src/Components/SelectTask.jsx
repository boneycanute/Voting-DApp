import React, { useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { ProviderContext } from '../App';

function SelectTask() {
    const nav = useNavigate();
    const provider = useContext(ProviderContext);
    // console.log(provider);
  return (
    <>
    <p>Welcome <u>{provider.account}</u></p>
    <p>What would you like to do today ?</p>
    <div className='MainContainer HorzontalView'>
    

    <button className="largeBtn" onClick={()=>{
        nav('/tasks/create');
    }}><h2>Create Poll</h2></button>

    <button className="largeBtn" onClick={()=>{
        nav('/tasks/show');
        }}><h2>Vote on Existing polls</h2></button>

<button className="largeBtn" onClick={()=>{
        nav('/tasks/results');
    }}><h2>See Completed Polls</h2></button>

</div>
    </>
    
  )
}

export default SelectTask