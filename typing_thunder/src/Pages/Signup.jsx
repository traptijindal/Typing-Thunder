import React, { useState } from 'react'
import logo from '/Logo.png'
import { FcGoogle } from "react-icons/fc";
import '../CSS/Signup.css'
import { useNavigate} from 'react-router-dom';



const Signup = () => {


  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const handleLoaderToggle = () => {
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
      navigate('/otp');
    }, 1000);
  };


  return (
    <div className='overflow-hidden'>
   <div className='m-5 md:mt-[25px] lg:mx-[80px]'>
      <div className='text-sm lg:text-xl flex justify-between mb-4 md:mb-[40px]  '>
      <div className='flex gap-[8px]'>
        <img src={logo} alt="" className='width-[24px] height-[22px] lg:width-[33px] lg:height-[31px]'/>
        <p className='text-[#E6E6E6]'>TypingThunder</p>
      </div>

      
     <div className=' hidden text-sm lg:text-lg md:flex gap-[8px]'>
        <p className='text-[#B3B3B3] '>Already a user?</p>
        <p className='text-[#FFFFFF] underline decoration-white underline-offset-4'>Login</p>
      </div>
     
      
     <div className=' text-sm lg:text-lg md:hidden gap-[8px]'>
        <p className='text-[#B3B3B3] '>Test Speed</p>
      </div>
     </div>


      <div className='flex justify-between'>
        <div className='hidden md:block left w-[50%] mt-20 '>
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
           <button className='bg-[#FFFFFF] text-black text-base px-8 py-2 lg:py-4 rounded-xl font-semibold'>Take a Speed Test</button>
        </div>

        <div className='right w-full md:w-[40%]'>
             <h1 className='text-2xl lg:text-4xl text-[#FFFFFF] mb-2'>Sign Up</h1>
             <p className='text-[#B3B3B3] text-xs md:text-sm lg:text-base mb-2 md:mb-6'>Sign Up to test your typing speed with your companions.</p>
            <div className='block w-full'>
            <input type="text"  placeholder='Enter email' className='w-full md:w-[45%] text-white bg-[#1A1A1A] mb-2 lg:mb-6 border border-white rounded-xl py-4 pl-2 pr-8 text-sm lg:text-lg mr-5'/>
            <input type="text"  placeholder='Username' className='w-full md:w-[45%] text-white bg-[#1A1A1A] mb-2 lg:mb-6 border border-white rounded-xl py-4 pl-2 pr-8 text-sm lg:text-lg'/>
            </div>
             <input type='text'  placeholder='Enter password' className='block w-full text-white bg-[#1A1A1A] border border-white rounded-xl py-4 pl-2 pr-8 mb-2 lg:mb-4 text-sm lg:text-lg'/>
             <p className='text-end mb-2 text-[#FFFFFF] text-sm lg:text-base '>Reset password</p>
             <div className='flex mb-2 lg:mb-6'>
             <input type="checkbox"/>
             <p className='text-[#FFFFFF] ml-2 text-sm lg:text-base'>Remember me</p>
             </div>
            
             <button 
              className='w-full mb-2 lg:mb-4 bg-white text-black border border-white rounded-xl py-2 lg:py-4 pl-2 pr-8 text-center  text-base lg:text-xl font-semibold flex justify-center items-center' 
              onClick={handleLoaderToggle}>
              {!loader ? "Continue" : <div className='loader'></div>}
              </button>
             
             
            
             <button className='w-full text-white border border-white rounded-xl py-2 lg:py-4 pl-2 pr-8 text-center text-base lg:text-xl  flex justify-center items-center'> <FcGoogle className='mr-2'/>Continue with google</button>

             <div className=' md:hidden text-sm lg:text-lg flex gap-[8px] mt-2 lg:mt-6'>
             <p className='text-[#B3B3B3] '>Already a user?</p>
             <p className='text-[#FFFFFF] underline decoration-white underline-offset-4'>Login</p>
            </div> 
        </div>

       
      </div>
    
    </div>
    
    </div>

    
  )
}

export default Signup

