import React, { useState } from 'react'
import logo from '/Logo.png'
import { FcGoogle } from "react-icons/fc";
import '../CSS/Login.css'


const Login = () => {
  

  return (
    <div className='overflow-hidden'>
   <div className='m-5 md:my-[25px] lg:my-[28px] lg:mx-[80px] overflow-hidden '>
      <div className='text-sm lg:text-xl flex justify-between mb-6 md:mb-[40px]  '>
      <div className='flex gap-[8px]'>
        <img src={logo} alt="" className='width-[24px] height-[22px] lg:width-[33px] lg:height-[31px]'/>
        <p className='text-[#E6E6E6]'>TypingThunder</p>
      </div>

      
     <div className=' hidden text-sm lg:text-lg md:flex gap-[8px]'>
        <p className='text-[#B3B3B3] '>Don't have an account?</p>
        <p className='text-[#FFFFFF] underline decoration-white underline-offset-4'>Sign Up</p>
      </div>
     
      
     <div className=' text-sm lg:text-lg md:hidden gap-[8px]'>
        <p className='text-[#B3B3B3] '>Test Speed</p>
      </div>
     </div>


      <div className='flex justify-between'>
        <div className='hidden md:block left w-[50%] mt-16 '>
          <p className='text-[25px] lg:text-[30px] text-[#B3B3B3]'>Compete with your friends</p>
          <div className="wrapper mb-4">
            <div className="static-txt">
                 in</div>
           <ul className="dynamic-txts">
            <li><span>arena</span></li>
            <li><span>sphere</span></li>
           </ul>
          </div>

           <p className='text-[#B3B3B3] text-base lg:text-xl mb-4'>Assess and improve your typing speed with our interactive typing tests. Receive instant feedback and track your progress over time.</p>
           <button className='bg-[#FFFFFF] text-black text-base px-6 py-4 lg:py-3 rounded-xl font-semibold'>Take a Speed Test</button>
        </div>

        <div className='right w-full md:w-[40%] flex  flex-col justify-center '>
             <h1 className='text-3xl lg:text-4xl text-[#FFFFFF] mb-2'>Login</h1>
             <p className='text-[#B3B3B3] text-sm  lg:text-base mb-9 md:mb-2'>Login to test your typing speed with your companions.</p>
             <input type="text" placeholder='Enter registered email or username' className='hidden md:block w-full text-white bg-[#1A1A1A] mb-4 border border-white rounded-xl py-3 pl-2  text-sm lg:text-lg'/>
             <div className='entryarea block md:hidden mb-9 '>
              <input type="text"  required className='textarea'/>
              <div className="labelline">Enter email or username</div>
              </div>
             <input type='text' placeholder='Enter password' className='hidden md:block w-full text-white bg-[#1A1A1A] border border-white rounded-xl py-3 pl-2 mb-2  text-sm lg:text-lg'/>
              <div className='entryarea block md:hidden mb-6'>
              <input type="text"  required className='textarea'/>
              <div className="labelline">Enter password</div>
              </div>
             <p className='text-end mb-2 text-[#FFFFFF] text-sm lg:text-base '>Reset password</p>
             <div className='flex mb-4'>
             <input type="checkbox" className='bg-[#1A1A1A] border border-white  text-white focus:ring-0 rounded-lg h-5 w-5 '/>
             <p className='text-[#FFFFFF] ml-2 text-sm lg:text-base'>Remember me</p>
             </div>
             <button className='w-full mb-6 bg-white text-black border border-white rounded-xl py-2 md:py-3 pl-2 pr-8 text-center  text-base lg:text-xl font-semibold'>Continue</button>
             <button className='w-full text-white border border-white rounded-xl py-2 md:py-3 pl-2 pr-8 text-center text-base lg:text-xl  flex justify-center items-center'> <FcGoogle className='mr-2'/>Continue with google</button>

             <div className=' md:hidden text-sm flex gap-[8px] mt-8 justify-center'>
             <p className='text-[#B3B3B3] '>Don't have an account?</p>
             <p className='text-[#FFFFFF] underline decoration-white underline-offset-4'>Sign Up</p>
            </div> 
        </div>

       
      </div>
    
    </div>
    </div>
  )
}

export default Login
