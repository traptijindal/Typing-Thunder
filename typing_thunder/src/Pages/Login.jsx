import React from 'react'
import logo from '/Logo.png'
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
      <div className='flex '>
        <div className='w-[50%] mt-20 '>
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

        <div className='w-[50%]'>

        </div>
      </div>
    
    </div>
  )
}

export default Login
