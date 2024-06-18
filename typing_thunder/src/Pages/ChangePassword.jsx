import React from 'react'
import image from "/reset_1.png"
import logo from '/Logo.png'
import { FcGoogle } from "react-icons/fc";

const ChangePassword = () => {
  return (
    <div className='mx-5 md:my-[25px] lg:my-[32px] lg:mx-[80px] bg-[#1A1A1A] overflow-hidden '>
      <div className='hidden text-sm lg:text-xl md:flex justify-between mb-[40px] lg:mb-[60px] '>
    <div className='flex gap-[8px]'>
      <img src={logo} alt="" className='width-[24px] height-[22px] lg:width-[33px] lg:height-[31px]'/>
      <p className='text-[#E6E6E6]'>TypingThunder</p>
    </div>

    
   <div className='text-sm lg:text-lg flex gap-[8px]'>
      <p className='text-[#B3B3B3] '>Don't have an account?</p>
      <p className='text-[#FFFFFF] underline decoration-white underline-offset-4'>Sign Up</p>
    </div>
   </div>

   <div className=' flex flex-col md:flex-row justify-between  mt-10 lg:mt-20'>
      <div className="left w-[50%] hidden md:block">
        <img src={image} alt="" className='h-[400px] lg:h-[500px] lg:w-[520px]' />
     </div>

     <div className="right w-full md:w-[40%] text-white ">
         <h1 className='text-2xl lg:text-4xl text-[#FFFFFF] mb-2'>Change Password</h1>
        <p className='text-[#B3B3B3] text-sm lg:text-base mb-6'>Update your password and secure your account.</p>
        <input type="text" placeholder='Enter password' className='block w-full text-black bg-[#1A1A1A] mb-6 border border-white rounded-xl py-4 pl-2 pr-8 text-sm lg:text-lg'/>
        <input type="text" placeholder='Confirm password' className='block w-full text-black bg-[#1A1A1A] mb-20 md:mb-6 border border-white rounded-xl py-4 pl-2 pr-8 text-sm lg:text-lg'/>
        <button className='w-full mb-6 bg-white text-black border border-white rounded-xl py-2 lg:py-4 pl-2 pr-8 text-center  text-base lg:text-xl font-semibold'>Done</button>
       
        <button className='w-full mb-4 md:mb-6  text-white border border-white rounded-xl py-2 lg:py-4 pl-2 pr-8 text-center  text-base lg:text-xl '>Direct Login</button>
      </div>

      <div className='flex md:hidden justify-center'>
        <p className='text-[#B3B3B3] mr-2 '>Don’t have an account?</p>
        <p className='text-[#FFFFFF]'>Sign Up</p>
      </div>

    </div>
    </div> 

    
  )
}

export default ChangePassword