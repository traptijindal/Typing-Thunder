import React from 'react'
import logo from '/Logo.png'
import { FcGoogle } from "react-icons/fc";
import '../CSS/Login.css'


const Login = () => {
  return (
    <div className='content '>
    <div className='text-xl flex justify-between mb-[72px] '>
      <div className='flex gap-[8px]'>
        <img src={logo} alt="" className='width-[33px] height-[31px]'/>
        <p className='text-[#E6E6E6]'>TypingThunder</p>
      </div>

      <div className='text-lg flex gap-[8px]'>
        <p className='text-[#B3B3B3] '>Don't have an account?</p>
        <p className='text-[#FFFFFF] underline decoration-white underline-offset-4'>Sign Up</p>
      </div>
     </div>


      <div className='flex justify-between'>
        <div className='left w-[50%] mt-20 '>
          <p className='text-[36px] text-[#B3B3B3]'>Compete with your friends</p>
          <div className="wrapper mb-6">
            <div className="static-txt">
                 in</div>
           <ul className="dynamic-txts">
            <li><span>arena</span></li>
            <li><span>sphere</span></li>
           </ul>
          </div>

           <p className='text-[#B3B3B3] text-xl mb-6'>Assess and improve your typing speed with our interactive typing tests. Receive instant feedback and track your progress over time.</p>
           <button className='bg-[#FFFFFF] text-black text-base px-8 py-4 rounded-xl font-semibold'>Test Speed</button>
        </div>

        <div className='right w-[40%]'>
             <h1 className='text-4xl text-[#FFFFFF] mb-5'>Login</h1>
             <p className='text-[#B3B3B3] text-base mb-8'>Login to test your typing speed with your companions.</p>
             <input type="text" placeholder='Enter registered email or username' className='block w-full text-black bg-[#1A1A1A] mb-8 border border-white rounded-xl py-4 pl-2 pr-8'/>
             <input type='text' placeholder='Enter password' className='block w-full text-black bg-[#1A1A1A] border border-white rounded-xl py-4 pl-2 pr-8 mb-8'/>
             <p className='text-end mb-4 text-[#FFFFFF]'>Reset password</p>
             <div className='flex mb-8'>
             <input type="checkbox"/>
             <p className='text-[#FFFFFF] ml-2 text-base'>Remember me</p>
             </div>
             <button className='w-full mb-8 bg-white text-black border border-white rounded-xl py-4 pl-2 pr-8 text-center text-xl font-semibold'>Continue</button>
             <button className='w-full text-white border border-white rounded-xl py-4 pl-2 pr-8 text-center text-xl  flex justify-center items-center'> <FcGoogle className='mr-2'/>Continue with google</button>
             
        </div>
      </div>
    
    </div>
  )
}

export default Login
