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
import Practice from './Pages/Practice.jsx';
import Sphere from './Pages/Sphere.jsx';
import Rating from './Pages/Rating.jsx';

import Play1v1 from './Pages/Play1v1.jsx';
import Play1v1Result from './Pages/Play1v1Result.jsx';



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
      <Route path="/practice" element={<Practice/>}/>
      <Route path="/sphere" element={<Sphere/>}/>
      <Route path="/rating" element={<Rating/>}/>
      <Route path="/play" element={<Play1v1/>}/>
      <Route path="/playresult" element={<Play1v1Result/>}/>
   
      </Routes>
      
    </div>
    </Auth0Provider>
  )
}

export default App

