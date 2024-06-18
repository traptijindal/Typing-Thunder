import React, { useState } from 'react'
import logo from '/Logo.png'
import { FcGoogle } from "react-icons/fc";
import '../CSS/Login.css'


const Login = () => {
  

  return (
    <div className='overflow-hidden'>
   <div className='content '>
      <div className='text-sm lg:text-xl flex justify-between mb-[40px] lg:mb-[60px] '>
      <div className='flex gap-[8px]'>
        <img src={logo} alt="" className='width-[24px] height-[22px] lg:width-[33px] lg:height-[31px]'/>
        <p className='text-[#E6E6E6]'>TypingThunder</p>
      </div>

      
     <div className='text-sm lg:text-lg flex gap-[8px]'>
        <p className='text-[#B3B3B3] '>Don't have an account?</p>
        <p className='text-[#FFFFFF] underline decoration-white underline-offset-4'>Sign Up</p>
      </div>
     </div>


      <div className='flex justify-between'>
        <div className='left w-[50%] mt-20 '>
          <p className='text-[25px] lg:text-[36px] text-[#B3B3B3]'>Compete with your friends</p>
          <div className="wrapper mb-4">
            <div className="static-txt">
                 in</div>
           <ul className="dynamic-txts">
            <li><span>arena</span></li>
            <li><span>sphere</span></li>
           </ul>
          </div>

           <p className='text-[#B3B3B3] text-base lg:text-xl mb-4'>Assess and improve your typing speed with our interactive typing tests. Receive instant feedback and track your progress over time.</p>
           <button className='bg-[#FFFFFF] text-black text-base px-8 py-2 lg:py-4 rounded-xl font-semibold'>Test Speed</button>
        </div>

        <div className='right w-[40%]'>
             <h1 className='text-2xl lg:text-4xl text-[#FFFFFF] mb-2'>Login</h1>
             <p className='text-[#B3B3B3] text-sm lg:text-base mb-6'>Login to test your typing speed with your companions.</p>
             <input type="text" placeholder='Enter registered email or username' className='block w-full text-black bg-[#1A1A1A] mb-6 border border-white rounded-xl py-4 pl-2 pr-8 text-sm lg:text-lg'/>
             <input type='text' placeholder='Enter password' className='block w-full text-black bg-[#1A1A1A] border border-white rounded-xl py-4 pl-2 pr-8 mb-4 text-sm lg:text-lg'/>
             <p className='text-end mb-2 text-[#FFFFFF] text-sm lg:text-base '>Reset password</p>
             <div className='flex mb-6'>
             <input type="checkbox"/>
             <p className='text-[#FFFFFF] ml-2 text-sm lg:text-base'>Remember me</p>
             </div>
             <button className='w-full mb-6 bg-white text-black border border-white rounded-xl py-2 lg:py-4 pl-2 pr-8 text-center  text-base lg:text-xl font-semibold'>Continue</button>
             <button className='w-full text-white border border-white rounded-xl py-2 lg:py-4 pl-2 pr-8 text-center text-base lg:text-xl  flex justify-center items-center'> <FcGoogle className='mr-2'/>Continue with google</button>
             
        </div>
      </div>
    
    </div>
    </div>
  )
}

export default Login
