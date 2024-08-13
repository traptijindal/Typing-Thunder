// import React, { useState } from 'react'
// import logo from '/Logo.png'
// import { FcGoogle } from "react-icons/fc";
// import '../CSS/Signup.css'
// import { useNavigate} from 'react-router-dom';

// const Signup = () => {

//   const [loader, setLoader] = useState(false);
//   const navigate = useNavigate();

//   const handleLoaderToggle = () => {
//     setLoader(true);
//     setTimeout(() => {
//       setLoader(false);
//       navigate('/otp');
//     }, 1000);
//   };

//   return (
//     <div className='overflow-hidden'>
//    <div className='m-5 md:mt-[25px] lg:mx-[80px]'>
//       <div className='text-sm lg:text-xl flex justify-between mb-4 md:mb-[40px]  '>
//       <div className='flex gap-[8px]'>
//         <img src={logo} alt="" className='width-[24px] height-[22px] lg:width-[33px] lg:height-[31px]'/>
//         <p className='text-[#E6E6E6]'>TypingThunder</p>
//       </div>

//      <div className=' hidden text-sm lg:text-lg md:flex gap-[8px]'>
//         <p className='text-[#B3B3B3] '>Already a user?</p>
//         <p className='text-[#FFFFFF] underline decoration-white underline-offset-4'>Login</p>
//       </div>

//      <div className=' text-sm lg:text-lg md:hidden gap-[8px]'>
//         <p className='text-[#B3B3B3] '>Test Speed</p>
//       </div>
//      </div>

//       <div className='flex justify-between'>
//         <div className='hidden md:block left w-[50%] mt-20 '>
//           <p className='text-[25px] lg:text-[36px] text-[#B3B3B3]'>Compete with your friends</p>
//           <div className="wrapper mb-4">
//             <div className="static-txt">
//                  in</div>
//            <ul className="dynamic-txts">
//             <li><span>arena</span></li>
//             <li><span>sphere</span></li>
//            </ul>
//           </div>

//            <p className='text-[#B3B3B3] text-base lg:text-xl mb-4'>Assess and improve your typing speed with our interactive typing tests. Receive instant feedback and track your progress over time.</p>
//            <button className='bg-[#FFFFFF] text-black text-base px-8 py-2 lg:py-4 rounded-xl font-semibold'>Take a Speed Test</button>
//         </div>

//         <div className='right w-full md:w-[40%]'>
//              <h1 className='text-2xl lg:text-4xl text-[#FFFFFF] mb-2'>Sign Up</h1>
//              <p className='text-[#B3B3B3] text-xs md:text-sm lg:text-base mb-2 md:mb-6'>Sign Up to test your typing speed with your companions.</p>
//             <div className='block w-full'>
//             <input type="text"  placeholder='Enter email' className='w-full md:w-[45%] text-white bg-[#1A1A1A] mb-2 lg:mb-6 border border-white rounded-xl py-4 pl-2 pr-8 text-sm lg:text-lg mr-5'/>
//             <input type="text"  placeholder='Username' className='w-full md:w-[45%] text-white bg-[#1A1A1A] mb-2 lg:mb-6 border border-white rounded-xl py-4 pl-2 pr-8 text-sm lg:text-lg'/>
//             </div>
//              <input type='text'  placeholder='Enter password' className='block w-full text-white bg-[#1A1A1A] border border-white rounded-xl py-4 pl-2 pr-8 mb-2 lg:mb-4 text-sm lg:text-lg'/>
//              <p className='text-end mb-2 text-[#FFFFFF] text-sm lg:text-base '>Reset password</p>
//              <div className='flex mb-2 lg:mb-6'>
//              <input type="checkbox"/>
//              <p className='text-[#FFFFFF] ml-2 text-sm lg:text-base'>Remember me</p>
//              </div>

//              <button
//               className='w-full mb-2 lg:mb-4 bg-white text-black border border-white rounded-xl py-2 lg:py-4 pl-2 pr-8 text-center  text-base lg:text-xl font-semibold flex justify-center items-center'
//               onClick={handleLoaderToggle}>
//               {!loader ? "Continue" : <div className='loader'></div>}
//               </button>

//              <button className='w-full text-white border border-white rounded-xl py-2 lg:py-4 pl-2 pr-8 text-center text-base lg:text-xl  flex justify-center items-center'> <FcGoogle className='mr-2'/>Continue with google</button>

//              <div className=' md:hidden text-sm lg:text-lg flex gap-[8px] mt-2 lg:mt-6'>
//              <p className='text-[#B3B3B3] '>Already a user?</p>
//              <p className='text-[#FFFFFF] underline decoration-white underline-offset-4'>Login</p>
//             </div>
//         </div>

//       </div>

//     </div>

//     </div>

//   )
// }

// export default Signup

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import logo from "/Logo.png";
import { FcGoogle } from "react-icons/fc";
import "../CSS/Signup.css";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const {
    user: auth0User,
    isAuthenticated,
    isLoading,
    logout,
    loginWithRedirect,
  } = useAuth0();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      setLoader(true);
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/signup",
        {
          email,
          username,
          password,
        }
      );

      const { email: responseEmail, username: responseUsername } =
        response.data.data;

      // Store user data in local storage
      localStorage.setItem("email", responseEmail);
      localStorage.setItem("username", responseUsername);
      console.log(
        "Email and Username set in localStorage:",
        responseEmail,
        responseUsername
      ); // Debugging

      // Store user data in local storage
      // localStorage.setItem('user', JSON.stringify({ username, email }));
      // console.log('Email and Username set in localStorage:', email, username);
      // Handle successful signup, e.g., navigate to OTP verification page
      console.log("Signup successful", response.data);
      navigate("/otp");
    } catch (err) {
      const errorMessage = err.response?.data.message || "Something went wrong";
      setError(errorMessage);
    } finally {
      setLoader(false);
    }
  };

  const handleGoogleLogin = async () => {
    await loginWithRedirect({
      redirectUri: window.location.origin,
      connection: "google-oauth2",
    });
  };

  return (
    <div className="overflow-hidden">
      <div className="m-5 md:mt-[25px] lg:mx-[80px]">
        <div className="text-sm lg:text-xl flex justify-between mb-4 md:mb-[40px]">
          <div className="flex gap-[8px]">
            <img
              src={logo}
              alt="Logo"
              className="width-[24px] height-[22px] lg:width-[33px] lg:height-[31px]"
            />
            <p className="text-[#E6E6E6]">TypingThunder</p>
          </div>
          <div className="hidden text-sm lg:text-lg md:flex gap-[8px]">
            <p className="text-[#B3B3B3]">Already a user?</p>
            <Link to="/login">
              {" "}
              <p className="text-[#FFFFFF] underline decoration-white underline-offset-4 cursor-pointer">
                Login
              </p>
            </Link>
          </div>
          <div className="text-sm lg:text-lg md:hidden gap-[8px]">
            <p className="text-[#B3B3B3]">Test Speed</p>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="hidden md:block left w-[50%] mt-20">
            <p className="text-[25px] lg:text-[36px] text-[#B3B3B3]">
              Compete with your friends
            </p>
            <div className="wrapper mb-4">
              <div className="static-txt">in</div>
              <ul className="dynamic-txts">
                <li>
                  <span>arena</span>
                </li>
                <li>
                  <span>sphere</span>
                </li>
              </ul>
            </div>
            <p className="text-[#B3B3B3] text-base lg:text-xl mb-4">
              Assess and improve your typing speed with our interactive typing
              tests. Receive instant feedback and track your progress over time.
            </p>
            <button className="bg-[#FFFFFF] text-black text-base px-8 py-2 lg:py-4 rounded-xl font-semibold">
              Take a Speed Test
            </button>
          </div>
          <div className="right w-full md:w-[40%]">
            <h1 className="text-2xl lg:text-4xl text-[#FFFFFF] mb-2">
              Sign Up
            </h1>
            <p className="text-[#B3B3B3] text-xs md:text-sm lg:text-base mb-2 md:mb-6">
              Sign Up to test your typing speed with your companions.
            </p>
            <div className="block w-full">
              <input
                type="text"
                placeholder="Enter email"
                className="w-full md:w-[45%] text-white bg-[#1A1A1A] mb-2 lg:mb-6 border border-white rounded-xl py-4 pl-2 pr-8 text-sm lg:text-lg mr-5"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="text"
                placeholder="Username"
                className="w-full md:w-[45%] text-white bg-[#1A1A1A] mb-2 lg:mb-6 border border-white rounded-xl py-4 pl-2 pr-8 text-sm lg:text-lg"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <input
              type="password"
              placeholder="Enter password"
              className="block w-full text-white bg-[#1A1A1A] border border-white rounded-xl py-4 pl-2 pr-8 mb-2 lg:mb-4 text-sm lg:text-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="my-2 text-[#FF7E7E]">{error}</p>}
            <Link to="/reset">
              <p className="text-end mb-2 text-[#FFFFFF] text-sm lg:text-base">
                Reset password
              </p>
            </Link>
            <div className="flex mb-2 lg:mb-6">
              <input type="checkbox" />
              <p className="text-[#FFFFFF] ml-2 text-sm lg:text-base">
                Remember me
              </p>
            </div>
            <button
              className="w-full mb-2 lg:mb-4 bg-white text-black border border-white rounded-xl py-2 lg:py-4 pl-2 pr-8 text-center text-base lg:text-xl font-semibold flex justify-center items-center"
              onClick={handleSignup}
            >
              {!loader ? "Continue" : <div className="loader"></div>}
            </button>

            <button
              className="w-full text-white border border-white rounded-xl py-2 lg:py-4 pl-2 pr-8 text-center text-base lg:text-xl  flex justify-center items-center"
              onClick={handleGoogleLogin}
            >
              <FcGoogle className="mr-2" /> Continue with Google
            </button>

            <div className="md:hidden text-sm lg:text-lg flex gap-[8px] mt-2 lg:mt-6">
              <p className="text-[#B3B3B3]">Already a user?</p>
              <Link to="/login">
                {" "}
                <p className="text-[#FFFFFF] underline decoration-white underline-offset-4 cursor-pointer">
                  Login
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
