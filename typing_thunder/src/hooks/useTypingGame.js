import { useState } from "react";

export const useTypingGame = (defaultText) => {
  const [randomText, setRandomText] = useState("");
  const [randomPunctuation, setAddPunctuation] = useState(false);
  const [randomNumber, setAddNumbers] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [text, setText] = useState(defaultText);
  const [Total_time, setTime] = useState();
  const [timeLeft, setTimeLeft] = useState(0);

  return {
    randomText,
    randomPunctuation,
    randomNumber,
    isRunning,
    userInput,
    text,
    Total_time,
    timeLeft,
    setRandomText,
    setAddPunctuation,
    setAddNumbers,
    setIsRunning,
    setUserInput,
    setText,
    setTime,
    setTimeLeft,
  };
};
