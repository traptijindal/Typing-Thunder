import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Textarea from "../components/Textarea";
import Footer from "../components/Footer";
import Timer_word from "../components/Timer_word";
import { useNavigate } from "react-router-dom";
import ProgressTracker from "../components/ProgressTracker";
import { useAppContext } from '../context/AppContext';

const Landing = () => {
  const { userInput, setUserInput, text, setText,isRunning,setIsRunning,timeLeft,setTimeLeft,Total_time,setTime } = useAppContext();
  
  const [randomText, setRandomText] = useState("");
  const [randomPunctuation, setAddPunctuation] = useState(false);
  const [randomNumber, setAddNumbers] = useState(false);
  // const [isRunning, setIsRunning] = useState(false);
  const [showButtons, setShowButtons] = useState(true);
  // const [userInput, setUserInput] = useState("");
  // const [text, setText] = useState(defaultText);
  // const [Total_time, setTime] = useState();
  // const [timeLeft, setTimeLeft] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    navigate("/result", {
      state: {
        userInput,
        text,
        Total_time,
        timeLeft,
      },
    });
  };

  return (
    <div className="m-5 md:mt-[25px] lg:mt-[28px] lg:mx-[80px] overflow-hidden static">
      <Navbar />
      <ProgressTracker userInput={userInput} text={text}/>
      <Textarea
        randomText={randomText}
        randomPunctuation={randomPunctuation}
        randomNumber={randomNumber}
        userInput={userInput}
        setUserInput={setUserInput}
        text={text}
        setText={setText}
        isRunning={isRunning}
        // speed={speed}
        // accuracy={accuracy}
      />
      <Timer_word
        setRandomText={setRandomText}
        setAddPunctuation={setAddPunctuation}
        setAddNumbers={setAddNumbers}
        isRunning={isRunning}
        setIsRunning={setIsRunning}
        showButtons={showButtons}
        setShowButtons={setShowButtons}
        userInput={userInput}
        setUserInput={setUserInput}
        text={text}
        handleNext={handleNext}
        Total_time={Total_time}
        setTime={setTime}
        setTimeLeft={setTimeLeft}
        timeLeft={timeLeft}
      />

      <Footer showButtons={showButtons} />
    </div>
  );
};

export default Landing;
