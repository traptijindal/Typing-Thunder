import React from 'react'
import otp from '/otp.png'
import logo from '/Logo.png'


const Otp = () => {
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
    
    <img src={otp} alt="" className='h-[400px] lg:h-[500px] lg:w-[520px]' />
 </div>

 <div className="right w-full md:w-[40%] text-white ">
     <h1 className='text-2xl lg:text-4xl text-[#FFFFFF] mb-2'>Enter OTP</h1>
    <p className='text-[#B3B3B3] text-sm lg:text-base mb-6'>Please enter the 6-digit code sent to you at</p>
    <div className='flex mb-6 w-[100%] md:w-[90%] '>
      <input type="number" className='w-[15%] h-10 lg:h-14 mr-3 rounded-lg lg:rounded-xl bg-[#1A1A1A] border border-white text-center'/>
      <input type="number" className='w-[15%] h-10 lg:h-14 mr-3 rounded-lg lg:rounded-xl bg-[#1A1A1A] border border-white text-center'/>
      <input type="number" className='w-[15%] h-10 lg:h-14 mr-3 rounded-lg lg:rounded-xl bg-[#1A1A1A] border border-white text-center'/>
      <input type="number" className='w-[15%] h-10 lg:h-14 mr-3 rounded-lg lg:rounded-xl bg-[#1A1A1A] border border-white text-center'/>
      <input type="number" className='w-[15%] h-10 lg:h-14 mr-3 rounded-lg lg:rounded-xl bg-[#1A1A1A] border border-white text-center'/>
      <input type="number" className='w-[15%] h-10 lg:h-14 mr-3 rounded-lg lg:rounded-xl bg-[#1A1A1A] border border-white text-center'/>
    </div>

    <p className='mb-48 md:mb-6'>Resend OTP in </p>
    <button className='w-full  bg-white text-black border border-white rounded-xl py-2 lg:py-4 pl-2 pr-8 text-center  text-base lg:text-xl font-semibold'>Verify</button>

  </div>

  <div className='flex md:hidden mt-4 justify-center'>
    <p className='text-[#B3B3B3] mr-2'>Don’t have an account?</p>
    <p className='text-[#FFFFFF]'>Sign Up</p>
  </div>

</div>
</div>
  )
}

export default Otp
