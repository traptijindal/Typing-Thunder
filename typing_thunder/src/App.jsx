import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Landing from './Pages/Landing.jsx'
import Login from './Pages/Login.jsx'
import Signup from './Pages/Signup.jsx'


const App = () => {
  return (
    <div>
      <Routes>
      <Route path="/" element={<Landing/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
      </Routes>
      
    </div>
  )
}

export default App

