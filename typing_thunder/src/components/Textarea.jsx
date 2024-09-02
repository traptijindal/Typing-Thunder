import React, { useState, useEffect } from "react";
import ProgressTracker from "./ProgressTracker";

const Textarea = ({
  randomText,
  randomPunctuation,
  randomNumber,
  userInput,
  setUserInput,
  text,
  setText,
}) => {
  const [shiftPressed, setShiftPressed] = useState(false);
  const [capsLockOn, setCapsLockOn] = useState(false);

  const shiftSymbols = {
    1: "!",
    2: "@",
    3: "#",
    4: "$",
    5: "%",
    6: "^",
    7: "&",
    8: "*",
    9: "(",
    0: ")",
    "-": "_",
    "=": "+",
    "[": "{",
    "]": "}",
    "\\": "|",
    ";": ":",
    "'": '"',
    ",": "<",
    ".": ">",
    "/": "?",
  };

  useEffect(() => {
    if (randomText) {
      setText(randomText);
    }
  }, [randomText]);

  useEffect(() => {
    if (randomPunctuation) {
      setText(randomPunctuation);
    }
  }, [randomPunctuation]);

  useEffect(() => {
    if (randomNumber) {
      setText(randomNumber);
    }
  }, [randomNumber]);

  const getHighlightedText = (input, text) => {
    return text.split("").map((char, index) => {
      if (index < input.length) {
        return input[index] === char ? (
          <span key={index} className="text-white">
            {char}
          </span>
        ) : (
          <span key={index} className="text-red-500">
            {char}
          </span>
        );
      } else if (index === input.length) {
        return (
          <span key={index} className="relative">
            <span className="absolute bg-white w-[2px] h-8 animate-blink cursor-pointer"></span>
            <span className="text-[#666666] ml-[2px]">{char}</span>
          </span>
        );
      } else {
        return (
          <span key={index} className="text-[#666666]">
            {char}
          </span>
        );
      }
    });
  };

 
  useEffect(() => {
    const handleKeyDown = (e) => {
      let key = e.key;
  
      // Ignore non-printable keys
      const nonPrintableKeys = [
        "Alt", "Control", "Meta", "Escape", "ArrowUp", "ArrowDown", "ArrowLeft", 
        "ArrowRight", "PageUp", "PageDown", "Home", "End", "Insert", "Delete", 
        "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12", 
        "Tab", "NumLock", "ScrollLock", "Pause", "PrintScreen", "Fn", "ContextMenu"
      ];
  
      if (nonPrintableKeys.includes(key)) {
        return;
      }
  
      if (e.altKey) {
        return;
      }
  
      if (key === "Shift") {
        setShiftPressed(true);
        return;
      }
  
      if (key === "CapsLock") {
        setCapsLockOn((prevState) => !prevState);
        return;
      }
  
      if (key === "Backspace") {
        setUserInput((prevInput) => prevInput.slice(0, -1));
        return;
      }
  
      if (shiftPressed && shiftSymbols[key]) {
        key = shiftSymbols[key];
      } else {
        if (capsLockOn) {
          key = key.toUpperCase();
        } else {
          key = key.toLowerCase();
        }
  
        if (shiftPressed && !shiftSymbols[key]) {
          key = key.toUpperCase();
        }
      }
  
      setUserInput((prevInput) => prevInput + key);
    };
  
    const handleKeyUp = (e) => {
      if (e.key === "Shift") {
        setShiftPressed(false);
      }
    };
  
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
  
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [shiftPressed, capsLockOn]);
  

  return (
    <div className="mb-10">
         {/* <ProgressTracker userInput={userInput} text={text}/> */}
      <div className="text-[20px] lg:text-[25px] text-start font-ocr">
        {getHighlightedText(userInput, text)}
      </div>
    </div>
  );
};

export default Textarea;
