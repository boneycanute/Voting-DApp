import React from 'react'
import { useNavigate } from 'react-router-dom'

function CreatePoll() {
  const nav = useNavigate();

  const createPoll = ()=>
  {
    nav('/tasks');
  } 

  return (
    <div className='MainContainer'>
        <h1>Create your own poll</h1>
        <div className='SubContainer'>
            <label><h2 class="noVertMargin">Poll Title</h2>
                <input class="custom-input" placeholder='Poll Title'></input>
            </label>
            <label><h2>Description</h2>
                <input class="custom-input" placeholder='Description'></input>
            </label>
            <label><h2>Duration</h2>
                <input type="datetime-local" class="custom-input" placeholder='Description'></input>
            </label>
            
            <button onClick={()=>{createPoll()}}>Save and Launch Poll</button>
        </div>
    </div>
  )
}

export default CreatePoll