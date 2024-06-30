import React from 'react'
import image from "/reset_1.png"
import logo from '/Logo.png'

const ChangePassword = () => {
  return (
    <div className='m-5 md:mt-[25px]  lg:mx-[80px] overflow-hidden' >
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

   <div className=' flex flex-col md:flex-row justify-between   lg:mt-16'>
      <div className="left w-[50%] hidden md:block">
        
        {/* <img src={image} alt="" className=' md:h-[395px] lg:h-[480px] '/> */}
        <img src={image} alt="" className='lg:w-[440px] md:h-[350px] lg:h-[420px]'/>
       </div>

     <div className="right w-full md:w-[40%] text-white">
         <h1 className='text-2xl lg:text-4xl text-[#FFFFFF] mb-2'>Change Password</h1>
        <p className='text-[#B3B3B3] text-sm mb-4 '>Update your password and secure your account.</p>
        <input type="text" placeholder='Enter password' className='block w-full text-black bg-[#1A1A1A] mb-56 md:mb-4 border border-white rounded-xl py-3 pl-2 pr-8 text-sm lg:text-lg'/>
        <input type="text" placeholder='Confirm password' className='block w-full text-black bg-[#1A1A1A] mb-56 md:mb-4 border border-white rounded-xl py-3 pl-2 pr-8 text-sm lg:text-lg'/>
        <button className='w-full mb-4 lg:mb-6 bg-white text-black border border-white rounded-xl py-2 lg:py-3 pl-2 pr-8 text-center  text-base lg:text-xl font-semibold'>Done</button>
       
        <button className='w-full mb-6 text-white border border-white rounded-xl py-2 lg:py-3 pl-2 pr-8 text-center  text-base lg:text-xl '>Direct Login</button>
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


