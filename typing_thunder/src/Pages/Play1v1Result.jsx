import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Textarea from "../components/Textarea";
import Footer from "../components/Footer";
import ProgressTracker from "../components/ProgressTracker";
import { useTypingGame } from "../hooks/useTypingGame";
import io from "socket.io-client";

const socket = io("http://localhost:8000");

const Play1v1Test = () => {
  const defaultText =
    "Most of them are based on basic text fields that were modified...";
  
  const {
    randomText,
    isRunning,
    userInput,
    text,
    setUserInput,
    setText,
    progress,
  } = useTypingGame(defaultText);

  const [opponentProgress, setOpponentProgress] = useState(0);

  useEffect(() => {
   
    if (isRunning) {
      const progress = calculateProgress(userInput, randomText);
      socket.emit("typing-progress", { username: "yourUsername", progress });
    }

    
    socket.on("opponent-progress", (data) => {
      setOpponentProgress(data.progress);
    });

    return () => {
      socket.off("opponent-progress");
    };
  }, [userInput, isRunning]);

  return (
    <div className="m-5 md:mt-[25px] lg:mt-[28px] lg:mx-[80px] overflow-hidden static">
      <Navbar />
      <ProgressTracker
        userProgress={progress} 
        opponentProgress={opponentProgress} 
        is1v1={true}
      />
      <Textarea
        randomText={randomText}
        userInput={userInput}
        setUserInput={setUserInput}
        text={text}
        setText={setText}
        isRunning={isRunning}
        is1v1={true}
      />
      <Footer />
    </div>
  );
};

export default Play1v1Test;
