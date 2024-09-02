import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const defaultText =
    "Most of them are based on basic text fields that were modified to better handle specific types of information, like the credit card numbers. Here are just a few examples of input types that are most commonly used throughout UIs we creating.";
  const [userInput, setUserInput] = useState("");
  const [text, setText] = useState(defaultText);
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [Total_time, setTime] = useState();
  const [showButtons, setShowButtons] = useState(true);
  
  return (
    <AppContext.Provider value={{ userInput, setUserInput, text, setText,isRunning,setIsRunning,timeLeft,setTimeLeft,Total_time,setTime, showButtons,setShowButtons}}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
