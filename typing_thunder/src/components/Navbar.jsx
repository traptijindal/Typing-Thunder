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

// import React, { useEffect, useState } from 'react';
// import { useAuth0 } from "@auth0/auth0-react";
// import { useNavigate } from 'react-router-dom';
// import logo from '/Logo.png';
// import usernamePic from '/Group 41.png'; // Update the path if necessary

// const Navbar = () => {
//   const { user: auth0User, isAuthenticated, isLoading, logout  } = useAuth0();
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();

//   // Retrieve user data from local storage safely
//   useEffect(() => {
//     const userString = localStorage.getItem('user');
//     if (userString) {
//       try {
//         const localStorageUser = JSON.parse(userString);

//         // If authenticated via OAuth, use auth0User data, else use local storage user data
//         if (isAuthenticated && auth0User) {
//           setUser({
//             username: auth0User.name, // Use Google username
//             email: auth0User.email,
//           });
//         } else {
//           setUser(localStorageUser);
//         }
//       } catch (e) {
//         console.error("Error parsing user data from local storage:", e);
//       }
//     } else if (isAuthenticated && auth0User) {
//       // Set user if no local storage data but authenticated via OAuth
//       setUser({
//         username: auth0User.name,
//         email: auth0User.email,
//       });
//     }
//   }, [isAuthenticated, auth0User]);

//   // Handle logout functionality
//   const handleLogout = () => {
//     localStorage.removeItem('user');
//     logout({ returnTo: window.location.origin });

//   };

//   return (
//     <div className='text-sm lg:text-xl flex justify-between mb-16'>
//       <div className='flex gap-[8px]'>
//         <img src={logo} alt="Logo" className='width-[24px] height-[22px] lg:width-[33px] lg:height-[31px]' />
//         <p className='text-[#E6E6E6]'>TypingThunder</p>
//       </div>

//       <div className='flex space-x-12 text-base'>
//         <p className='text-white'>Speed Test</p>
//         <p className='text-[#666666]'>Play 1 v 1</p>
//         <p className='text-[#666666]'>Practice</p>
//         <p className='text-[#666666]'>Sphere</p>
//         <p className='text-[#666666]'>Ratings</p>
//       </div>

//       <div className='text-base font-medium flex space-x-3 p-1'>
//         {user ? (
//           <>
//             <p className='text-white'>{user.username}</p>
//             <img src={usernamePic} alt="Profile" className='w-8 h-8 rounded-full' />
//             <button onClick={handleLogout} className='bg-white text-black rounded-3xl p-2'>Logout</button>
//           </>
//         ) : (
//           <>
//             <button onClick={() => navigate('/signup')} className='rounded-3xl bg-white text-black p-2'>Sign Up</button>
//             <button onClick={() => navigate('/login')} className='text-white p-2'>Login</button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Navbar;

// import React, { useEffect, useState } from 'react';
// import { useAuth0 } from "@auth0/auth0-react";
// import { useNavigate } from 'react-router-dom';
// import logo from '/Logo.png';
// import usernamePic from '/Group 41.png'; // Update the path if necessary

// const Navbar = () => {
//   const { user: auth0User, isAuthenticated, isLoading, logout } = useAuth0();
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const userString = localStorage.getItem('user');
//     if (userString) {
//       try {
//         const localStorageUser = JSON.parse(userString);
//         setUser(localStorageUser);
//       } catch (e) {
//         console.error("Error parsing user data from local storage:", e);
//       }
//     } else if (isAuthenticated && auth0User) {
//       setUser({
//         username: auth0User.name,
//         email: auth0User.email,
//       });
//     }
//   }, [isAuthenticated, auth0User]);

//   const handleLogout = () => {
//     localStorage.removeItem('user');
//     logout({ returnTo: window.location.origin });
//   };

//   return (
//     <div className='text-sm lg:text-xl flex justify-between mb-16'>
//       <div className='flex gap-[8px]'>
//         <img src={logo} alt="Logo" className='width-[24px] height-[22px] lg:width-[33px] lg:height-[31px]' />
//         <p className='text-[#E6E6E6]'>TypingThunder</p>
//       </div>
//       <div className='flex space-x-12 text-base'>
//         <p className='text-white'>Speed Test</p>
//         <p className='text-[#666666]'>Play 1 v 1</p>
//         <p className='text-[#666666]'>Practice</p>
//         <p className='text-[#666666]'>Sphere</p>
//         <p className='text-[#666666]'>Ratings</p>
//       </div>
//       <div className='text-base font-medium flex space-x-3 p-1'>
//         {user ? (
//           <>
//             <p className='text-white'>{user.username}</p>
//             <img src={usernamePic} alt="Profile" className='w-8 h-8 rounded-full' />
//             <button onClick={handleLogout} className='bg-white text-black rounded-3xl p-2'>Logout</button>
//           </>
//         ) : (
//           <>
//             <button onClick={() => navigate('/signup')} className='rounded-3xl bg-white text-black p-2'>Sign Up</button>
//             <button onClick={() => navigate('/login')} className='text-white p-2'>Login</button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Navbar;
import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import logo from "/Logo.png";
import usernamePic from "/Group 41.png"; // Update the path if necessary

const Navbar = () => {
  const { user: auth0User, isAuthenticated, logout } = useAuth0();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userString = localStorage.getItem("user");
    const email = localStorage.getItem("email");
    const username = localStorage.getItem("username");

    if (userString) {
      try {
        const localStorageUser = JSON.parse(userString);
        setUser({
          username: localStorageUser.username,
          email: localStorageUser.email,
        });
      } catch (e) {
        console.error("Error parsing user data from local storage:", e);
      }
    } else if (email && username) {
      setUser({ username, email });
    } else if (isAuthenticated && auth0User) {
      setUser({
        username: auth0User.name,
        email: auth0User.email,
      });
    }
  }, [isAuthenticated, auth0User]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("email");
    localStorage.removeItem("username");
    logout({ returnTo: window.location.origin });
  };

  return (
    <div className="text-sm lg:text-xl flex justify-between mb-16">
      <div className="flex gap-[8px]">
        <img
          src={logo}
          alt="Logo"
          className="w-[24px] h-[22px] lg:w-[30px] lg:h-[27px]"
        />
        <p className="text-[#E6E6E6] ">TypingThunder</p>
      </div>
      <div className="flex space-x-[4vw] text-sm lg:text-base  ">
        <p className="text-white">Speed Test</p>
        <p className="text-[#666666]">Play 1 v 1</p>
        <p className="text-[#666666]">Practice</p>
        <p className="text-[#666666]">Sphere</p>
        <p className="text-[#666666]">Ratings</p>
      </div>
      <div className="text-base font-medium flex space-x-[1vw] p-1">
        {user ? (
          <>
            <p className="text-white">{user.username}</p>
            <img
              src={usernamePic}
              alt="Profile"
              className="w-8 h-8 rounded-full"
            />
            <button
              onClick={handleLogout}
              className="bg-white text-black rounded-3xl p-2"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => navigate("/signup")}
              className=" rounded-3xl bg-white text-black p-2 text-sm lg:text-base"
            >
              Sign Up
            </button>
            <button
              onClick={() => navigate("/login")}
              className="text-white p-2 text-sm lg:text-base"
            >
              Login
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
