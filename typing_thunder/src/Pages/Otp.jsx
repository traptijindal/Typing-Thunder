// import React from 'react'
// import otp from '/otp.png'
// import logo from '/Logo.png'


// const Otp = () => {
//   return (
//     <div className='m-5 md:mt-[25px]  lg:mx-[80px] overflow-hidden fixed'>
//     <div className='hidden text-sm lg:text-xl md:flex justify-between mb-[40px] lg:mb-[60px] '>
// <div className='flex gap-[8px]'>
//   <img src={logo} alt="" className='width-[24px] height-[22px] lg:width-[33px] lg:height-[31px]'/>
//   <p className='text-[#E6E6E6]'>TypingThunder</p>
// </div>


// <div className='text-sm lg:text-lg flex gap-[8px]'>
//   <p className='text-[#B3B3B3] '>Don't have an account?</p>
//   <p className='text-[#FFFFFF] underline decoration-white underline-offset-4'>Sign Up</p>
// </div>
// </div>

// <div className=' flex flex-col md:flex-row justify-between  mt-5'>
//   <div className="left w-[50%] hidden md:block">
    
//     <img src={otp} alt="" className='  lg:w-[480px]' />
//  </div>

//  <div className="right w-full md:w-[40%] text-white ">
//      <h1 className='text-2xl lg:text-4xl text-[#FFFFFF] mb-2'>Enter OTP</h1>
//     <p className='text-[#B3B3B3] text-sm lg:text-base mb-6'>Please enter the 6-digit code sent to you at</p>
//     <div className='flex mb-6 w-[100%] md:w-[90%] '>
//       <input type="number" className='w-[15%] h-10 lg:h-14 mr-3 rounded-lg lg:rounded-xl bg-[#1A1A1A] border border-white text-center'/>
//       <input type="number" className='w-[15%] h-10 lg:h-14 mr-3 rounded-lg lg:rounded-xl bg-[#1A1A1A] border border-white text-center'/>
//       <input type="number" className='w-[15%] h-10 lg:h-14 mr-3 rounded-lg lg:rounded-xl bg-[#1A1A1A] border border-white text-center'/>
//       <input type="number" className='w-[15%] h-10 lg:h-14 mr-3 rounded-lg lg:rounded-xl bg-[#1A1A1A] border border-white text-center'/>
//       <input type="number" className='w-[15%] h-10 lg:h-14 mr-3 rounded-lg lg:rounded-xl bg-[#1A1A1A] border border-white text-center'/>
//       <input type="number" className='w-[15%] h-10 lg:h-14 mr-3 rounded-lg lg:rounded-xl bg-[#1A1A1A] border border-white text-center'/>
//     </div>

//     <p className='mb-48 md:mb-6'>Resend OTP in </p>
//     <button className='w-full  bg-white text-black border border-white rounded-xl py-2 lg:py-4 pl-2 pr-8 text-center  text-base lg:text-xl font-semibold'>Verify</button>

//   </div>

//   <div className='flex md:hidden mt-4 justify-center'>
//     <p className='text-[#B3B3B3] mr-2'>Don’t have an account?</p>
//     <p className='text-[#FFFFFF]'>Sign Up</p>
//   </div>

// </div>
// </div>
//   )
// }

// export default Otp



// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import otpImage from '/otp.png';
// import logo from '/Logo.png';

// const Otp = () => {
//   const [otp, setOtp] = useState(Array(6).fill(''));
//   const [message, setMessage] = useState('');
//   const [timer, setTimer] = useState(60); // 60 seconds timer
//   const [resendDisabled, setResendDisabled] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Start the timer
//     const interval = setInterval(() => {
//       setTimer((prev) => {
//         if (prev === 1) {
//           clearInterval(interval);
//           setResendDisabled(false); // Enable the resend "button"
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);

//     // Clean up the interval on component unmount
//     return () => clearInterval(interval);
//   }, []);

//   const handleChange = (value, index) => {
//     const newOtp = [...otp];
//     newOtp[index] = value;
//     setOtp(newOtp);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const otpString = otp.join('');

//     try {
//       const response = await fetch('http://localhost:8000/api/v1/users/otp', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ otp: otpString }),
//       });

//       const data = await response.json();
//       if (response.ok) {
//         setMessage('OTP verified successfully');
//         navigate('/');
//       } else {
//         setMessage(data.message);
//       }
//     } catch (error) {
//       setMessage('Failed to verify OTP');
//     }
//   };

//   const handleResendOTP = async () => {
//     if (resendDisabled) return;

//     const email = localStorage.getItem('email'); // Get email from localStorage
//     if (!email) {
//       setMessage('Email not found. Please sign up again.');
//       return;
//     }

//     try {
//       const response = await fetch('http://localhost:8000/api/v1/users/resend-otp', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email }), // Use the email from localStorage
//       });

//       const data = await response.json();
//       if (response.ok) {
//         setMessage('OTP has been resent successfully');
//         setTimer(60); // Restart the timer
//         setResendDisabled(true);
//       } else {
//         setMessage(data.message);
//       }
//     } catch (error) {
//       setMessage('Failed to resend OTP');
//     }
//   };

//   return (
//     <div className='m-5 md:mt-[25px] lg:mx-[80px] overflow-hidden fixed'>
//       <div className='hidden text-sm lg:text-xl md:flex justify-between mb-[40px] lg:mb-[60px] '>
//         <div className='flex gap-[8px]'>
//           <img src={logo} alt="" className='width-[24px] height-[22px] lg:width-[33px] lg:height-[31px]' />
//           <p className='text-[#E6E6E6]'>TypingThunder</p>
//         </div>

//         <div className='text-sm lg:text-lg flex gap-[8px]'>
//           <p className='text-[#B3B3B3]'>Don't have an account?</p>
//           <p className='text-[#FFFFFF] underline decoration-white underline-offset-4'>Sign Up</p>
//         </div>
//       </div>

//       <div className='flex flex-col md:flex-row justify-between mt-5'>
//         <div className="left w-[50%] hidden md:block">
//           <img src={otpImage} alt="" className='lg:w-[480px]' />
//         </div>

//         <div className="right w-full md:w-[40%] text-white">
//           <h1 className='text-2xl lg:text-4xl text-[#FFFFFF] mb-2'>Enter OTP</h1>
//           <p className='text-[#B3B3B3] text-sm lg:text-base mb-6'>Please enter the 6-digit code sent to you at</p>

//           <form onSubmit={handleSubmit}>
//             <div className='flex mb-6 w-[100%] md:w-[90%]'>
//               {otp.map((value, index) => (
//                 <input
//                   key={index}
//                   type="number"
//                   value={value}
//                   onChange={(e) => handleChange(e.target.value, index)}
//                   className='w-[15%] h-10 lg:h-14 mr-3 rounded-lg lg:rounded-xl bg-[#1A1A1A] border border-white text-center'
//                 />
//               ))}
//             </div>
//             {message && <p className='mt-2 text-[#FF7E7E]'>{message}</p>}

//             <p
//               className={`mb-48 md:mb-6 cursor-pointer ${resendDisabled ? 'text-gray-500' : 'text-white'}`}
//               onClick={handleResendOTP}
//             >
//               {resendDisabled ? `Resend OTP in ${timer} seconds` : 'Resend OTP'}
//             </p>
//             <button type='submit' className='w-full bg-white text-black border border-white rounded-xl py-2 lg:py-4 pl-2 pr-8 text-center text-base lg:text-xl font-semibold'>Verify</button>
//           </form>

//           <div className='flex md:hidden mt-4 justify-center'>
//             <p className='text-[#B3B3B3] mr-2'>Don’t have an account?</p>
//             <p className='text-[#FFFFFF]'>Sign Up</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Otp;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import otpImage from '/otp.png';
import logo from '/Logo.png';

const Otp = () => {
  const [otp, setOtp] = useState(Array(6).fill(''));
  const [message, setMessage] = useState('');
  const [timer, setTimer] = useState(60); // 60 seconds timer
  const [resendDisabled, setResendDisabled] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Start the timer
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) {
          clearInterval(interval);
          setResendDisabled(false); // Enable the resend "button"
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const startTimer = () => {
    setTimer(60);
    setResendDisabled(true);

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) {
          clearInterval(interval);
          setResendDisabled(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpString = otp.join('');

    try {
      const response = await fetch('http://localhost:8000/api/v1/users/otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ otp: otpString }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('OTP verified successfully');
        navigate('/');
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage('Failed to verify OTP');
    }
  };

  const handleResendOTP = async () => {
    if (resendDisabled) return;

    const email = localStorage.getItem('email'); // Get email from localStorage
    if (!email) {
      setMessage('Email not found. Please sign up again.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/v1/users/resend-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }), // Use the email from localStorage
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('OTP has been resent successfully');
        startTimer(); // Restart the timer
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage('Failed to resend OTP');
    }
  };

  return (
    <div className='m-5 md:mt-[25px] lg:mx-[80px] overflow-hidden fixed'>
      <div className='hidden text-sm lg:text-xl md:flex justify-between mb-[40px] lg:mb-[60px] '>
        <div className='flex gap-[8px]'>
          <img src={logo} alt="" className='width-[24px] height-[22px] lg:width-[33px] lg:height-[31px]' />
          <p className='text-[#E6E6E6]'>TypingThunder</p>
        </div>

        <div className='text-sm lg:text-lg flex gap-[8px]'>
          <p className='text-[#B3B3B3]'>Don't have an account?</p>
          <p className='text-[#FFFFFF] underline decoration-white underline-offset-4'>Sign Up</p>
        </div>
      </div>

      <div className='flex flex-col md:flex-row justify-between mt-5'>
        <div className="left w-[50%] hidden md:block">
          <img src={otpImage} alt="" className='lg:w-[480px]' />
        </div>

        <div className="right w-full md:w-[40%] text-white">
          <h1 className='text-2xl lg:text-4xl text-[#FFFFFF] mb-2'>Enter OTP</h1>
          <p className='text-[#B3B3B3] text-sm lg:text-base mb-6'>Please enter the 6-digit code sent to you at</p>

          <form onSubmit={handleSubmit}>
            <div className='flex mb-6 w-[100%] md:w-[90%]'>
              {otp.map((value, index) => (
                <input
                  key={index}
                  type="number"
                  value={value}
                  onChange={(e) => handleChange(e.target.value, index)}
                  className='w-[15%] h-10 lg:h-14 mr-3 rounded-lg lg:rounded-xl bg-[#1A1A1A] border border-white text-center'
                />
              ))}
            </div>
            {message && <p className='my-2 text-[#FF7E7E]'>{message}</p>}

            <p
              className={`mb-48 md:mb-6 cursor-pointer ${resendDisabled ? 'text-gray-500' : 'text-white'}`}
              onClick={handleResendOTP}
            >
              {resendDisabled ? `Resend OTP in ${timer} seconds` : 'Resend OTP'}
            </p>
            <button type='submit' className='w-full bg-white text-black border border-white rounded-xl py-2 lg:py-4 pl-2 pr-8 text-center text-base lg:text-xl font-semibold'>Verify</button>
          </form>

          <div className='flex md:hidden mt-4 justify-center'>
            <p className='text-[#B3B3B3] mr-2'>Don’t have an account?</p>
            <p className='text-[#FFFFFF]'>Sign Up</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Otp;
