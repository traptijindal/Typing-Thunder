// import React, { useState,useEffect } from 'react';
// import profile from "/Frame 67.png";

// const Textarea = () => {
//   const [userInput, setUserInput] = useState('');
//   const text = "Most of them are based on basic text fields that were modified to better handle specific types of information, like the credit card numbers. Here are just a few examples of input types that are most commonly used throughout UIs we creating.";

//   const handleChange = (e) => {
//     setUserInput(e.target.value);
//   };

//   const getHighlightedText = (input, text) => {
//     return text.split('').map((char, index) => {
//       if (index < input.length) {
//         return input[index] === char ? (
//           <span key={index} className="text-white">{char}</span>
//         ) : (
//           <span key={index} className="text-red-500">{char}</span>
//         );
//       } else {
//         return <span key={index} className="text-[#666666]">{char}</span>;
//       }
//     });
//   };

//   const calculateProgress = (input, text) => {
//     let correctCount = 0;
//     for (let i = 0; i < text.length; i++) {
//       if (i < input.length && input[i] === text[i]) {
//         correctCount++;
//       }
//     }
//     return (correctCount / text.length) * 100;
//   };

//   const progress = calculateProgress(userInput, text);

//   useEffect(() => {
//     const handleKeyPress = (e) => {
//       let key = e.key;

//       // Check if Caps Lock is on
//       const capsLockOn = e.getModifierState('CapsLock');
//       if (key !== 'CapsLock' && key !== 'Backspace') {
//       if (capsLockOn) {
//         key = key.toUpperCase(); // Convert to uppercase if Caps Lock is on
//       } else {
//         key = key.toLowerCase(); // Convert to lowercase if Caps Lock is off
//       }
//     }
//       if (key === 'Backspace') {
//         setUserInput(prevInput => prevInput.slice(0, -1)); // Handle backspace
//       } else if(key!='CapsLock') {
//         setUserInput(prevInput => prevInput + key); // Append the pressed key to userInput
//       }
//     };

//     window.addEventListener('keydown', handleKeyPress);

//     return () => {
//       window.removeEventListener('keydown', handleKeyPress);
//     };
//   }, []);

//   return (
//     <div className='mb-24'>
//       <div className='flex justify-center'>
//         <div className="relative flex mb-20 w-full max-w-3xl my-8">
//           <img
//             src={profile}
//             alt="profile"
//             className='absolute bottom-4 transition-transform duration-300'
//             style={{ left: `${progress}%`, transform: 'translateX(-50%)' }}
//           />
//           <div
//             className="absolute w-full h-1"
//             style={{
//               background: `linear-gradient(to right, white ${progress}%, #666666 ${progress}%)`
//             }}
//           ></div>
//           <div className="relative w-full flex justify-between">
//             <div>
//               <div className="absolute left-0 transform translate-x-1/2 -translate-y-1/2 h-4 w-4 bg-[#666666] rounded-full "></div>
//               <div className='text-[#666666] mt-4 absolute left-0 transform translate-x-1/2 -translate-y-1/2 h-4 w-4'>Start</div>
//             </div>
//             <div>
//               <div className="absolute right-0 transform translate-x-1/2 -translate-y-1/2 h-4 w-4 bg-[#666666] rounded-full"></div>
//               <div className='text-[#666666] mt-4 absolute right-0 transform translate-x-1/2 -translate-y-1/2 h-4 w-4'>End</div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className='text-[25px] text-start font-ocr' >
//         {getHighlightedText(userInput, text)}
        
//       </div>
     
//     </div>
//   );
// }

// export default Textarea;


import React, { useState, useEffect } from 'react';
import profile from "/Frame 67.png";

const Textarea = ({ randomText, randomPunctuation, randomNumber }) => {
  const defaultText = "Most of them are based on basic text fields that were modified to better handle specific types of information, like the credit card numbers. Here are just a few examples of input types that are most commonly used throughout UIs we creating.";
  const [userInput, setUserInput] = useState('');
  const [text, setText] = useState(defaultText);
  const [shiftPressed, setShiftPressed] = useState(false);
  const [capsLockOn, setCapsLockOn] = useState(false);

  const shiftSymbols = {
    '1': '!', '2': '@', '3': '#', '4': '$', '5': '%', '6': '^', '7': '&', '8': '*', '9': '(', '0': ')',
    '-': '_', '=': '+', '[': '{', ']': '}', '\\': '|', ';': ':', '\'': '"', ',': '<', '.': '>', '/': '?'
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
    return text.split('').map((char, index) => {
      if (index < input.length) {
        return input[index] === char ? (
          <span key={index} className="text-white">{char}</span>
        ) : (
          <span key={index} className="text-red-500">{char}</span>
        );
      } else {
        return <span key={index} className="text-[#666666]">{char}</span>;
      }
    });
  };

  const calculateProgress = (input, text) => {
    let correctCount = 0;
    for (let i = 0; i < text.length; i++) {
      if (i < input.length && input[i] === text[i]) {
        correctCount++;
      }
    }
    return (correctCount / text.length) * 100;
  };

  const progress = calculateProgress(userInput, text);

  useEffect(() => {
    const handleKeyDown = (e) => {
      let key = e.key;

      if (e.altKey) {
        return; // Do nothing if Alt is pressed
      }

      if (key === 'Shift') {
        setShiftPressed(true);
        return;
      }

      if (key === 'CapsLock') {
        setCapsLockOn(prevState => !prevState);
        return;
      }

      if (key === 'Backspace') {
        setUserInput(prevInput => prevInput.slice(0, -1));
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

      setUserInput(prevInput => prevInput + key);
    };

    const handleKeyUp = (e) => {
      if (e.key === 'Shift') {
        setShiftPressed(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [shiftPressed, capsLockOn]);
  return (
    <div className='mb-24'>
      <div className='flex justify-center'>
        <div className="relative flex mb-20 w-full max-w-3xl my-8">
          <img
            src={profile}
            alt="profile"
            className='absolute bottom-4 transition-transform duration-300'
            style={{ left: `${progress}%`, transform: 'translateX(-50%)' }}
          />
          <div
            className="absolute w-full h-1"
            style={{
              background: `linear-gradient(to right, white ${progress}%, #666666 ${progress}%)`
            }}
          ></div>
          <div className="relative w-full flex justify-between">
            <div>
              <div className="absolute left-0 transform translate-x-1/2 -translate-y-1/2 h-4 w-4 bg-[#666666] rounded-full"></div>
              <div className='text-[#666666] mt-4 absolute left-0 transform translate-x-1/2 -translate-y-1/2 h-4 w-4'>Start</div>
            </div>
            <div>
              <div className="absolute right-0 transform translate-x-1/2 -translate-y-1/2 h-4 w-4 bg-[#666666] rounded-full"></div>
              <div className='text-[#666666] mt-4 absolute right-0 transform translate-x-1/2 -translate-y-1/2 h-4 w-4'>End</div>
            </div>
          </div>
        </div>
      </div>
      <div className='text-[25px] text-start font-ocr'>
        {getHighlightedText(userInput, text)}
      </div>
    </div>
  );
};

export default Textarea;
