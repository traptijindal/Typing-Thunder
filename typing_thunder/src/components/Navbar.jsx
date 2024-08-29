import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link, useNavigate } from "react-router-dom";
import logo from "/Logo.png";
import usernamePic from "/Group 41.png"; // Update the path if necessary

const Navbar = () => {
  const { user: auth0User, isAuthenticated, logout } = useAuth0();
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
      <div className="relative md:hidden">
        <button
          className="text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        {isMenuOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg z-50">
            <Link to="/"><p className="text-white p-2 cursor-pointer">Speed Test</p></Link>
            <p className="text-[#666666] p-2 cursor-pointer">Play 1 v 1</p>
            <Link to="/practice"><p className="text-[#666666] p-2 cursor-pointer">Practice</p></Link>
            <p className="text-[#666666] p-2 cursor-pointer">Sphere</p>
            <p className="text-[#666666] p-2 cursor-pointer">Ratings</p>
            {user ? (
              <>
                <p className="text-white p-2">{user.username}</p>
                <img
                  src={usernamePic}
                  alt="Profile"
                  className="w-8 h-8 rounded-full mx-auto"
                />
                <button
                  onClick={handleLogout}
                  className="bg-white text-black rounded-3xl p-2 mx-auto block"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate("/signup")}
                  className="bg-white text-black rounded-3xl p-2 block w-full text-center"
                >
                  Sign Up
                </button>
                <button
                  onClick={() => navigate("/login")}
                  className="text-white p-2 block w-full text-center"
                >
                  Login
                </button>
              </>
            )}
          </div>
        )}
      </div>
      <div className="hidden md:flex space-x-[4vw] text-sm lg:text-base">
        <Link to="/"><p className="text-white">Speed Test</p></Link>
        <p className="text-[#666666]">Play 1 v 1</p>
       <Link to="/practice"> <p className="text-[#666666]">Practice</p></Link>
        <p className="text-[#666666]">Sphere</p>
        <p className="text-[#666666]">Ratings</p>
      </div>
      <div className="hidden md:flex text-base font-medium space-x-[1vw] ">
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
              className="rounded-3xl bg-white text-black p-2 text-sm lg:text-base"
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
