// import React, { useState, useEffect, useRef } from 'react';

// const CutPaste = ({userInput,setUserInput,originalText,setOriginalText}) => {
 
//   const textContainerRef = useRef(null);

//   const [shiftPressed, setShiftPressed] = useState(false);
//   const [capsLockOn, setCapsLockOn] = useState(false);

//   const shiftSymbols = {
//     1: "!",
//     2: "@",
//     3: "#",
//     4: "$",
//     5: "%",
//     6: "^",
//     7: "&",
//     8: "*",
//     9: "(",
//     0: ")",
//     "-": "_",
//     "=": "+",
//     "[": "{",
//     "]": "}",
//     "\\": "|",
//     ";": ":",
//     "'": '"',
//     ",": "<",
//     ".": ">",
//     "/": "?",
//   };

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCursorVisible((visible) => !visible);
//     }, 500); // Cursor blink interval
//     return () => clearInterval(interval);
//   }, []);

//   const handlePaste = (e) => {
//     const pastedText = e.clipboardData.getData('Text');
//     setOriginalText(pastedText);
//     setUserInput(''); // Clear user input on paste
//     setCursorPosition(0); // Start cursor at the beginning
//     e.preventDefault();
//   };

//   const getHighlightedText = (userInput, originalText) => {
//     return originalText.split("").map((char, index) => {
//       if (index < userInput.length) {
//         return userInput[index] === char ? (
//           <span key={index} className="text-white">
//             {char}
//           </span>
//         ) : (
//           <span key={index} className="text-red-500">
//             {char}
//           </span>
//         );
//       } else if (index === userInput.length) {
//         return (
//           <span key={index} className="relative">
//             <span className="absolute bg-white w-[2px] h-8 animate-blink cursor-pointer"></span>
//             <span className="text-[#666666] ml-[2px]">{char}</span>
//           </span>
//         );
//       } else {
//         return (
//           <span key={index} className="text-[#666666]">
//             {char}
//           </span>
//         );
//       }
//     });
//   };

 
//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       let key = e.key;
  
//       // Ignore non-printable keys
//       const nonPrintableKeys = [
//         "Alt", "Control", "Meta", "Escape", "ArrowUp", "ArrowDown", "ArrowLeft", 
//         "ArrowRight", "PageUp", "PageDown", "Home", "End", "Insert", "Delete", 
//         "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12", 
//         "Tab", "NumLock", "ScrollLock", "Pause", "PrintScreen", "Fn", "ContextMenu"
//       ];
  
//       if (nonPrintableKeys.includes(key)) {
//         return;
//       }
  
//       if (e.altKey) {
//         return;
//       }
  
//       if (key === "Shift") {
//         setShiftPressed(true);
//         return;
//       }
  
//       if (key === "CapsLock") {
//         setCapsLockOn((prevState) => !prevState);
//         return;
//       }
  
//       if (key === "Backspace") {
//         setUserInput((prevInput) => prevInput.slice(0, -1));
//         return;
//       }
  
//       if (shiftPressed && shiftSymbols[key]) {
//         key = shiftSymbols[key];
//       } else {
//         if (capsLockOn) {
//           key = key.toUpperCase();
//         } else {
//           key = key.toLowerCase();
//         }
  
//         if (shiftPressed && !shiftSymbols[key]) {
//           key = key.toUpperCase();
//         }
//       }
  
//       setUserInput((prevInput) => prevInput + key);
//     };
  
//     const handleKeyUp = (e) => {
//       if (e.key === "Shift") {
//         setShiftPressed(false);
//       }
//     };
  
//     window.addEventListener("keydown", handleKeyDown);
//     window.addEventListener("keyup", handleKeyUp);
  
//     return () => {
//       window.removeEventListener("keydown", handleKeyDown);
//       window.removeEventListener("keyup", handleKeyUp);
//     };
//   }, [shiftPressed, capsLockOn]);
  

//   return (
//     <div
//       onPaste={handlePaste}
      
//       tabIndex="0" // Make the div focusable to capture key events
//       ref={textContainerRef}
     
//        className="whitespace-pre-wrap p-2 h-[30vh] overflow-hidden relative text-white font-ocr text-[25px] outline-none cursor-text"
//     >
//       {getHighlightedText(userInput, originalText)}
//     </div>
//   );
// };

// export default CutPaste;
  
import React, { useState, useEffect, useRef } from 'react';

const CutPaste = ({ userInput, setUserInput, originalText, setOriginalText }) => {
  const textContainerRef = useRef(null);
  const [shiftPressed, setShiftPressed] = useState(false);
  const [capsLockOn, setCapsLockOn] = useState(false);
  const [scrollIndex, setScrollIndex] = useState(0);
  const [visibleChars, setVisibleChars] = useState(0);

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

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCursorVisible((visible) => !visible);
  //   }, 500); // Cursor blink interval
  //   return () => clearInterval(interval);
  // }, []);

  useEffect(() => {
    const textContainer = textContainerRef.current;

    if (textContainer) {
      const containerWidth = textContainer.clientWidth;
      const characterWidth = parseInt(window.getComputedStyle(textContainer).fontSize, 10);
      const charsPerLine = Math.floor(containerWidth / characterWidth);
      const visibleHeight = textContainer.clientHeight;
      const lineHeight = parseInt(window.getComputedStyle(textContainer).lineHeight, 10);
      const visibleLines = Math.floor(visibleHeight / lineHeight);

      setVisibleChars(charsPerLine * visibleLines);
    }
  }, [originalText]);

  const handlePaste = (e) => {
    const pastedText = e.clipboardData.getData('Text');
    setOriginalText(pastedText);
    setUserInput(''); // Clear user input on paste
    setScrollIndex(0); // Reset scroll index
    e.preventDefault();
  };

  const getHighlightedText = (userInput, originalText) => {
    const visibleText = originalText.slice(scrollIndex, scrollIndex + visibleChars);

    return visibleText.split("").map((char, index) => {
      const absoluteIndex = scrollIndex + index;
      if (absoluteIndex < userInput.length) {
        return userInput[absoluteIndex] === char ? (
          <span key={index} className="text-white">
            {char}
          </span>
        ) : (
          <span key={index} className="text-red-500">
            {char}
          </span>
        );
      } else if (absoluteIndex === userInput.length) {
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

      const nonPrintableKeys = [
        "Alt", "Control", "Meta", "Escape", "ArrowUp", "ArrowDown", "ArrowLeft", 
        "ArrowRight", "PageUp", "PageDown", "Home", "End", "Insert", "Delete", 
        "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12", 
        "Tab", "NumLock", "ScrollLock", "Pause", "PrintScreen", "Fn", "ContextMenu"
      ];

      if (nonPrintableKeys.includes(key) || e.altKey) return;

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

      // Scroll only if the visible text is completely typed
      if (userInput.length + 1 >= visibleChars + scrollIndex) {
        setScrollIndex((prevIndex) => prevIndex + visibleChars);
      }
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
  }, [shiftPressed, capsLockOn, userInput.length, scrollIndex, visibleChars]);

  return (
    <div
      onPaste={handlePaste}
      tabIndex="0" // Make the div focusable to capture key events
      ref={textContainerRef}
      className="whitespace-pre-wrap p-2 h-[30vh] overflow-hidden relative text-white font-ocr text-[25px] outline-none cursor-text"
    >
      {getHighlightedText(userInput, originalText)}
    </div>
  );
};

export default CutPaste;

