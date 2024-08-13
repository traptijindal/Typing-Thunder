import React from 'react'
import { Routes,Route } from 'react-router-dom'
import { Auth0Provider } from '@auth0/auth0-react';
import Landing from './Pages/Landing.jsx'
import Login from './Pages/Login.jsx'
import Signup from './Pages/Signup.jsx'
import Reset from './Pages/Reset.jsx'
import ChangePassword from './Pages/ChangePassword.jsx'
import Otp from './Pages/Otp.jsx'
import Result from './Pages/Result.jsx';


const App = () => {
  return (
    <Auth0Provider
    domain="dev-poyp312hqofsqydd.us.auth0.com"
    clientId="EQpXNNMXaQwGlZ4rbsIPnCKZ7V9PcWeT"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
    >
    <div>
      <Routes>
      <Route path="/" element={<Landing/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path='/reset' element={<Reset/>}/>
      <Route path='/change-password' element={<ChangePassword/>}/>
      <Route path='/otp' element={<Otp/>}/>
      <Route path='/result' element={<Result/>}/>
      </Routes>
      
    </div>
    </Auth0Provider>
  )
}

export default App

