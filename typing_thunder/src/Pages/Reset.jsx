// import React, { useState } from 'react'
// import image from "/reset_1.png"
// import logo from '/Logo.png'
// import { FcGoogle } from "react-icons/fc";



// const Reset = () => {

//   const[email,setEmail] = useState("");
//   const [message,setMessage]=useState("");
//   const[error,setError]=useState("");

//   const handleEmailChange=(e)=>{
//     setEmail(e.target.value);
//   };
//   const handleFormSubmit = async(e)=>{
//     e.preventDefault();

//     if(!email){
//       setError("Email is required");
//       return;
//     }

//     try{
//       const response = await fetch('',{
//         method:"POST",
//         headers:{
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email }),
//       });

//       const data = await response.json();

//       if(response.ok){
//         setMessage(data.message);
//         setError("");
//       }else{
//         setError(data.message);
//       }

//     }catch(err){
//       setError('Failed to send OTP. Please try again later.')
//     }
//   }
//   return (
//     <div className='m-5 md:mt-[25px]  lg:mx-[80px] overflow-hidden'>
          
//         <div className='hidden text-sm lg:text-xl md:flex justify-between mb-[40px] lg:mb-[60px]'>
//     <div className='flex gap-[8px]'>
//       <img src={logo} alt="" className='width-[24px] height-[22px] lg:width-[33px] lg:height-[31px]'/>
//       <p className='text-[#E6E6E6]'>TypingThunder</p>
//     </div>

    
//    <div className='text-sm lg:text-lg flex gap-[8px]'>
//       <p className='text-[#B3B3B3] '>Don't have an account?</p>
//       <p className='text-[#FFFFFF] underline decoration-white underline-offset-4'>Sign Up</p>
//     </div>
//    </div>

//     <div className=' flex flex-col md:flex-row justify-between   lg:mt-16'>
//       <div className="left w-[50%] hidden md:block">
//         {/* <img src={image} alt="" className='h-[400px] lg:h-[470px] ' /> */}
//         <img src={image} alt="" className='lg:w-[440px] md:h-[350px] lg:h-[420px]'/>
//         {/* <img src={image} alt="" className='lg:w-[440px] md:h-[350px] lg:h-[420px]'/> */}
//      </div>

//      <div className="right w-full md:w-[40%] text-white ">
//          <h1 className='text-2xl lg:text-4xl text-[#FFFFFF] mb-2'>Reset Password</h1>
//         <p className='text-[#B3B3B3] text-sm  mb-4'>Enter your email address to reset your password</p>
//         <input type="text" placeholder='Enter registered email' className='block w-full text-black bg-[#1A1A1A] mb-56 md:mb-4 border border-white rounded-xl py-3 pl-2 pr-8 text-sm lg:text-lg'/>
//         <button className='w-full mb-4 md:mb-6 bg-white text-black border border-white rounded-xl py-3 pl-2 pr-8 text-center  text-base lg:text-xl font-semibold'>Send OTP</button>
//         <button className='w-full  text-white border border-white rounded-xl py-3 pl-2 pr-8 text-center text-base lg:text-xl  flex justify-center items-center'> <FcGoogle className='mr-2'/> Continue with Google</button>
//       </div>

//       <div className='flex md:hidden mt-4 justify-center'>
//         <p className='text-[#B3B3B3] mr-2'>Don’t have an account?</p>
//         <p className='text-[#FFFFFF]'>Sign Up</p>
//       </div>

//     </div>
//     </div>
//   )
// }

// export default Reset



import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import image from "/reset_1.png";
import logo from '/Logo.png';
import { FcGoogle } from "react-icons/fc";

const Reset = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setError("Email is required");
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/v1/users/reset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setError('');
        navigate('/otp', { state: { email } }); // Navigate to /otp and pass email in state
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Failed to send OTP. Please try again later.');
    }
  };

  return (
    <div className='m-5 md:mt-[25px] lg:mx-[80px] overflow-hidden'>
      <div className='hidden text-sm lg:text-xl md:flex justify-between mb-[40px] lg:mb-[60px]'>
        <div className='flex gap-[8px]'>
          <img src={logo} alt="" className='width-[24px] height-[22px] lg:width-[33px] lg:height-[31px]' />
          <p className='text-[#E6E6E6]'>TypingThunder</p>
        </div>
        <div className='text-sm lg:text-lg flex gap-[8px]'>
          <p className='text-[#B3B3B3]'>Don't have an account?</p>
          <p className='text-[#FFFFFF] underline decoration-white underline-offset-4'>Sign Up</p>
        </div>
      </div>
      <div className='flex flex-col md:flex-row justify-between lg:mt-16'>
        <div className="left w-[50%] hidden md:block">
          <img src={image} alt="" className='lg:w-[440px] md:h-[350px] lg:h-[420px]' />
        </div>
        <div className="right w-full md:w-[40%] text-white">
          <h1 className='text-2xl lg:text-4xl text-[#FFFFFF] mb-2'>Reset Password</h1>
          <p className='text-[#B3B3B3] text-sm mb-4'>Enter your email address to reset your password</p>
          <form onSubmit={handleFormSubmit}>
            <input
              type="text"
              placeholder='Enter registered email'
              value={email}
              onChange={handleEmailChange}
              className='block w-full text-white bg-[#1A1A1A] mb-56 md:mb-4 border border-white rounded-xl py-3 pl-2 pr-8 text-sm lg:text-lg'
            />
            <button
              type="submit"
              className='w-full mb-4 md:mb-6 bg-white text-black border border-white rounded-xl py-3 pl-2 pr-8 text-center text-base lg:text-xl font-semibold'
            >
              Send OTP
            </button>
          </form>
          {message && <p className='text-green-500 my-2'>{message}</p>}
          {error && <p className='text-red-500 my-2'>{error}</p>}
          <button className='w-full text-white border border-white rounded-xl py-3 pl-2 pr-8 text-center text-base lg:text-xl flex justify-center items-center'>
            <FcGoogle className='mr-2' /> Continue with Google
          </button>
        </div>
        <div className='flex md:hidden mt-4 justify-center'>
          <p className='text-[#B3B3B3] mr-2'>Don’t have an account?</p>
          <p className='text-[#FFFFFF]'>Sign Up</p>
        </div>
      </div>
    </div>
  );
};

export default Reset;
