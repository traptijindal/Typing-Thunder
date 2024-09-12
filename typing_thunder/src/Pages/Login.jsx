import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import logo from "/Logo.png";
import { FcGoogle } from "react-icons/fc";
import "../CSS/Login.css";

const Login = () => {
  const { loginWithRedirect } = useAuth0();
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [userError, setUserError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setUserError("");
    setPasswordError("");

    const body = {
      password,
    };

    if (emailOrUsername.includes("@")) {
      body.email = emailOrUsername;
    } else {
      body.username = emailOrUsername;
    }

    console.log("Sending Request Body:", body);

    try {
      const response = await fetch("http://localhost:8000/api/v1/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("Login successful");

        const userData = {
          username: data.data.user.username,
          userId: data.data.user._id,
          accessToken:data.data.accessToken,
        };
        localStorage.setItem("user", JSON.stringify(userData));

        navigate("/");
      } else {
        if (data.message === "User not found!") {
          setUserError(data.message);
        } else if (data.message === "Wrong password") {
          setPasswordError(data.message);
        } else {
          setMessage(data.message);
        }
      }
    } catch (error) {
      setMessage("Failed to login");
    }
  };

  return (
    <div className="overflow-hidden">
      <div className="m-5 md:my-[25px] lg:my-[28px] lg:mx-[80px] overflow-hidden">
        <div className="text-sm lg:text-xl flex justify-between mb-6 md:mb-[40px]">
          <div className="flex gap-[8px]">
            <img
              src={logo}
              alt="Logo"
              className="w-[24px] h-[22px] lg:w-[33px] lg:h-[31px]"
            />
            <p className="text-[#E6E6E6]">TypingThunder</p>
          </div>
          <div className="hidden text-sm lg:text-lg md:flex gap-[8px]">
            <p className="text-[#B3B3B3]">Don't have an account?</p>
            <Link to="/signup">
              <p className="text-[#FFFFFF] underline decoration-white underline-offset-4 cursor-pointer">
                Sign Up
              </p>
            </Link>
          </div>
          <div className="text-sm lg:text-lg md:hidden gap-[8px]">
            <p className="text-[#B3B3B3]">Test Speed</p>
          </div>
        </div>

        <div className="flex justify-between">
          <div className="hidden md:block w-[50%] mt-16">
            <p className="text-[25px] lg:text-[30px] text-[#B3B3B3]">
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
            <Link to="/">
              <button className="cursor-pointer bg-[#FFFFFF] text-black text-base px-6 py-4 lg:py-3 rounded-xl font-semibold">
                Take a Speed Test
              </button>
            </Link>
          </div>

          <div className="w-full md:w-[40%] flex flex-col justify-center">
            <h1 className="text-3xl lg:text-4xl text-[#FFFFFF] mb-2">Login</h1>
            <p className="text-[#B3B3B3] text-sm lg:text-base mb-9 md:mb-2">
              Login to test your typing speed with your companions.
            </p>
            <form onSubmit={handleSubmit}>
              <div>
                <input
                  type="text"
                  placeholder="Enter registered email or username"
                  value={emailOrUsername}
                  onChange={(e) => setEmailOrUsername(e.target.value)}
                  className="hidden md:block w-full text-white bg-[#1A1A1A] mb-4 border border-white rounded-xl py-3 pl-2 text-sm lg:text-lg"
                />
                <div className="entryarea block md:hidden mb-9">
                  <input
                    type="text"
                    required
                    value={emailOrUsername}
                    onChange={(e) => setEmailOrUsername(e.target.value)}
                    className="textarea"
                  />
                  <div className="labelline">Enter email or username</div>
                </div>
                {userError && (
                  <p className="my-2 text-[#FF7E7E]">{userError}</p>
                )}
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="hidden md:block w-full text-white bg-[#1A1A1A] border border-white rounded-xl py-3 pl-2 mb-2 text-sm lg:text-lg"
                />
                <div className="entryarea block md:hidden mb-6">
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="textarea"
                  />
                  <div className="labelline">Enter password</div>
                </div>
                {passwordError && (
                  <p className="my-2 text-[#FF7E7E]">{passwordError}</p>
                )}
              </div>
              <Link to="/reset">
                <p className="text-end mb-2 text-[#FFFFFF] text-sm lg:text-base cursor-pointer">
                  Reset password
                </p>
              </Link>
              <div className="flex mb-4">
                <input
                  type="checkbox"
                  className="bg-[#1A1A1A] border border-white text-white focus:ring-0 rounded-lg h-5 w-5"
                />
                <p className="text-[#FFFFFF] ml-2 text-sm lg:text-base">
                  Remember me
                </p>
              </div>
              <button
                type="submit"
                className="w-full mb-6 bg-white text-black border border-white rounded-xl py-2 md:py-3 pl-2 pr-8 text-center text-base lg:text-xl font-semibold"
              >
                Continue
              </button>
            </form>
            <button
              className="w-full text-white border border-white rounded-xl py-2 md:py-3 pl-2 pr-8 text-center text-base lg:text-xl flex justify-center items-center"
              onClick={() => loginWithRedirect()}
            >
              <FcGoogle className="mr-2" />
              Continue with Google
            </button>

            <div className="md:hidden text-sm flex gap-[8px] mt-8 justify-center">
              <p className="text-[#B3B3B3]">Don't have an account?</p>
              <Link to="/signup">
                <p className="text-[#FFFFFF] underline decoration-white underline-offset-4 cursor-pointer">
                  Sign Up
                </p>
              </Link>
            </div>
          </div>
        </div>
        {message && (
          <p className="text-center text-green-500 mt-4">{message}</p>
        )}
      </div>
    </div>
  );
};

export default Login;
