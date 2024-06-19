import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Landing from './Pages/Landing.jsx'
import Login from './Pages/Login.jsx'
import Signup from './Pages/Signup.jsx'
import Reset from './Pages/Reset.jsx'
import ChangePassword from './Pages/ChangePassword.jsx'
import Otp from './Pages/Otp.jsx'


const App = () => {
  return (
    <div>
      <Routes>
      <Route path="/" element={<Landing/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path='/reset' element={<Reset/>}/>
      <Route path='/change-password' element={<ChangePassword/>}/>
      <Route path='/otp' element={<Otp/>}/>
      </Routes>
      
    </div>
  )
}

export default App

