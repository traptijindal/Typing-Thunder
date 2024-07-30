// import React from 'react'
// import logo from '/Logo.png'
// import username from "/Group 41.png"

// const Navbar = () => {
//   return ( 
//       <div className='text-sm lg:text-xl flex justify-between mb-16  '>
//       <div className='flex gap-[8px]'>
//         <img src={logo} alt="" className='width-[24px] height-[22px] lg:width-[33px] lg:height-[31px]'/>
//         <p className='text-[#E6E6E6]'>TypingThunder</p>
//       </div>

      
//      <div className='flex space-x-12 text-base '>
//           <p className='text-white '>Speed Test</p>
//           <p className='text-[#666666] '>Play 1 v 1</p>
//           <p className='text-[#666666] '>Practice</p>
//           <p className='text-[#666666] '>Sphere</p>
//           <p className='text-[#666666]'>Ratings</p> 
//      </div>
     
      
//      <div className='text-base font-medium flex space-x-3 p-1'>
//        {/* <button className='rounded-3xl bg-white text-black p-2 '>Sign Up</button>
//        <button className='text-white p-2'>Login</button> */}
//         <p className='text-white'>Lakshayyyyy</p>
//        <img src={username} alt=""/>
       
//       </div>
//      </div>

//   )
// }

// export default Navbar


import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '/Logo.png';
import usernamePic from '/Group 41.png'; // Update the path if necessary

const Navbar = () => {
  const navigate = useNavigate();

  // Retrieve user data from local storage safely
  const userString = localStorage.getItem('user');
  let user = null;

  if (userString) {
    try {
      user = JSON.parse(userString);
    } catch (e) {
      console.error("Error parsing user data from local storage:", e);
    }
  }

  // Handle logout functionality
  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login'); // Redirect to login page or any other page
  };

  return (
    <div className='text-sm lg:text-xl flex justify-between mb-16'>
      <div className='flex gap-[8px]'>
        <img src={logo} alt="Logo" className='width-[24px] height-[22px] lg:width-[33px] lg:height-[31px]' />
        <p className='text-[#E6E6E6]'>TypingThunder</p>
      </div>

      <div className='flex space-x-12 text-base'>
        <p className='text-white'>Speed Test</p>
        <p className='text-[#666666]'>Play 1 v 1</p>
        <p className='text-[#666666]'>Practice</p>
        <p className='text-[#666666]'>Sphere</p>
        <p className='text-[#666666]'>Ratings</p>
      </div>

      <div className='text-base font-medium flex space-x-3 p-1'>
        {user ? (
          <>
            <p className='text-white'>{user.username}</p>
            <img src={usernamePic} alt="Profile" className='w-8 h-8 rounded-full' />
            <button onClick={handleLogout} className='bg-white text-black rounded-3xl p-2'>Logout</button>
          </>
        ) : (
          <>
            <button onClick={() => navigate('/signup')} className='rounded-3xl bg-white text-black p-2'>Sign Up</button>
            <button onClick={() => navigate('/login')} className='text-white p-2'>Login</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;



  

