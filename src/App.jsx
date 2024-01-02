import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './Components/Login'
import SelectTask from './Components/SelectTask'
import CreatePoll from './Components/CreatePoll'
import SeePolls from './Components/SeePolls'
import SeeResults from './Components/SeeResults'
import PollDetails from './Components/PollDetails'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/tasks' element={<SelectTask/>}/>
      <Route path='/tasks/create' element={<CreatePoll/>}/>
      <Route path='/tasks/show' element={<SeePolls/>}/>
      <Route path='/tasks/results' element={<SeeResults/>}/>
      <Route path='/task/show/:id' element={<PollDetails/>}/>
    </Routes>
   
  )
}

export default App