import React from 'react'
import logo from '/Logo.png'

const Navbar = () => {
  return ( 
      <div className='text-sm lg:text-xl flex justify-between mb-16  '>
      <div className='flex gap-[8px]'>
        <img src={logo} alt="" className='width-[24px] height-[22px] lg:width-[33px] lg:height-[31px]'/>
        <p className='text-[#E6E6E6]'>TypingThunder</p>
      </div>

      
     <div className='flex space-x-12 text-base '>
          <p className='text-white '>Speed Test</p>
          <p className='text-[#666666] '>Play 1 v 1</p>
          <p className='text-[#666666] '>Practice</p>
          <p className='text-[#666666] '>Sphere</p>
          <p className='text-[#666666]'>Ratings</p> 
     </div>
     
      
     <div className='text-base font-medium flex space-x-3'>
       <button className='rounded-3xl bg-white text-black p-2 '>Sign Up</button>
       <button className='text-white p-2'>Login</button>
      </div>
     </div>

  )
}

export default Navbar
