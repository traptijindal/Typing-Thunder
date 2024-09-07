import React, { useState, useEffect } from "react";
import { Clock3 } from "lucide-react";
import quotes from "/Double_Quotes_L.png";
import T from "/T.png";
import { calculateAccuracy, calculateSpeed } from "../utils/utils.js";
import ActionButtons from "../components/ActionButtons";
import Time from "./Time.jsx";
import { Link } from "react-router-dom";
import ShareResult from "./ShareResult.jsx";

const Timer_word = ({
  setRandomText,
  setAddPunctuation,
  setAddNumbers,
  setIsRunning,
  isRunning,
  showButtons,
  setShowButtons,
  userInput,
  setUserInput,
  text,
  handleNext,
  setTime,
  Total_time,
  timeLeft,
  setTimeLeft,
}) => {
  const [hoverText1, setHoverText1] = useState("");
  const [hoverText2, setHoverText2] = useState("");
  const [accuracy, setAccuracy] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [timeUp, setTimeUp] = useState(false);
  const [showSharePopup, setShowSharePopup] = useState(false);

  const texts = [
    "The sun dipped below the horizon, painting the sky with hues of orange and pink. The evening breeze carried the scent of blooming jasmine, creating a serene atmosphere.",
    "A gentle rain began to fall, tapping softly on the window. The rhythmic sound was calming, a perfect backdrop for an evening spent reading a captivating novel.",
    "The bustling city was alive with energy, lights flickering in every direction. Amidst the chaos, a small café offered a quiet escape, a place to unwind and relax.",
    "In the heart of the forest, a hidden waterfall cascaded into a crystal-clear pool. The sound of rushing water was soothing, inviting visitors to pause and enjoy nature's beauty.",
    "The aroma of freshly baked bread filled the kitchen, mingling with the scent of brewed coffee. It was a cozy morning, perfect for enjoying a hearty breakfast with loved ones.",
    "The old library was a treasure trove of forgotten stories. Dusty shelves held volumes of history, adventure, and romance, each book waiting to be discovered by a curious reader.",
    "A blanket of stars covered the night sky, each one twinkling like a tiny diamond. Stargazing was a reminder of the vastness of the universe and our small place within it.",
    "A gentle breeze rustled the autumn leaves, creating a symphony of whispers. The forest was a tapestry of reds, oranges, and yellows, a testament to nature's ever-changing beauty.",
    "The playful antics of a group of puppies brought smiles to everyone's faces. Their boundless energy and innocent joy were infectious, reminding us of the simple pleasures in life.",
    "The scent of lavender wafted through the air, creating a calming ambiance. It was the perfect setting for an afternoon nap, a moment of peace and relaxation amidst a busy day.",
    "The majestic mountains stood tall, their peaks kissed by the clouds. Hiking along the trails offered breathtaking views and a sense of accomplishment with every step taken upward.",
    "A sailboat glided gracefully across the lake, its white sails billowing in the wind. The water shimmered under the sun, reflecting the beauty of the clear blue sky.",
    "The laughter of children echoed through the playground, a joyful chorus that lifted spirits. Their carefree games and imaginative adventures were a reminder of the innocence of youth.",
    "A vibrant garden bloomed with a riot of colors, flowers of every hue swaying gently in the breeze. It was a living canvas, a testament to the wonders of nature's palette.",
    "The aroma of a home-cooked meal filled the house, promising a delicious feast. Family and friends gathered around the table, sharing stories and laughter, creating cherished memories.",
  ];

  const generateRandomText = () => {
    const randomIndex = Math.floor(Math.random() * texts.length);
    return texts[randomIndex];
  };

  const generatePunctuation = () => {
    const randomIndex = Math.floor(Math.random() * texts.length);
    const random = texts[randomIndex];
    return random
      .split(" ")
      .map((word) => {
        const randomIndex = Math.floor(Math.random() * word.length);
        const punctuation = ".,!?".charAt(Math.floor(Math.random() * 4));
        return (
          word.slice(0, randomIndex) + punctuation + word.slice(randomIndex)
        );
      })
      .join(" ");
  };

  const generateNumbers = () => {
    const randomIndex = Math.floor(Math.random() * texts.length);
    const random = texts[randomIndex];
    return random
      .split(" ")
      .map((word) => {
        const randomIndex = Math.floor(Math.random() * word.length);
        const numbers = "1234567890".charAt(Math.floor(Math.random() * 4));
        return word.slice(0, randomIndex) + numbers + word.slice(randomIndex);
      })
      .join(" ");
  };

  const handleQuoteClick = () => {
    const randomText = generateRandomText();
    setRandomText(randomText);
  };

  const handleAddPunctuation = () => {
    const randomPunctuation = generatePunctuation();
    setAddPunctuation(randomPunctuation);
  };

  const handleAddNumbers = () => {
    const randomNumber = generateNumbers();
    setAddNumbers(randomNumber);
  };

  const handleHover1 = (text) => {
    setHoverText1(text);
  };

  const handleMouseLeave1 = () => {
    setHoverText1("");
  };
  const handleHover2 = (text) => {
    setHoverText2(text);
  };

  const handleMouseLeave2 = () => {
    setHoverText2("");
  };

  const resetUserInput = () => {
    setUserInput("");
    setIsRunning(true);
    setTimeLeft(Total_time);
    setTimeUp(false);
    setShowButtons(false);
  };

  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      const calculatedAccuracy = calculateAccuracy(userInput, text);
      const calculatedSpeed = calculateSpeed(userInput, Total_time, timeLeft);
      setAccuracy(calculatedAccuracy);
      setSpeed(calculatedSpeed);
      setIsRunning(false);
      setTimeUp(true);
    }

    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const handleTimeClick = (seconds) => {
    setTimeLeft(seconds);
    setIsRunning(true);
    setShowButtons(false);
    setTimeUp(false);
    setTime(seconds);
  };

  const handleShareClick= () =>{
    setShowSharePopup(true);
  }

  const handleShareClose= ()=>{
    setShowSharePopup(false);
  }


  return (
    <div>
      {!timeUp ? (
        <p className="text-center text-white mb-6">Time:{timeLeft}</p>
      ) : (
        <div>
          <div className="flex justify-center">
            <p className="mr-14">
              <span className="text-5xl text-white">{speed} </span>
              <span className="text-xl text-[#666666]">WPM</span>
            </p>
            <p className="mr-14">
              <span className="text-5xl text-white">{accuracy}% </span>
              <span className="text-xl text-[#666666]">Accuracy</span>
            </p>
            <p className="">
              <span className="text-5xl text-white">{Total_time} </span>
              <span className="text-xl text-[#666666]">Seconds</span>
            </p>
          </div>

          <ActionButtons onRestart={resetUserInput} handleNext={handleNext} onShareClick={handleShareClick}/>

         <Link to="/result"> 
         <p className="text-center font-light underline decoration-[#666666] text-[#666666] text-lg cursor-pointer transition ease-in hover:ease-out duration-300 hover:text-white hover:decoration-white">
            Show detailed results
          </p>
          </Link>
        </div>
      )}

      {showButtons && !isRunning && !timeUp && (
        <div className="flex justify-center space-x-6 mb-7">
          <div className="flex flex-col items-center">
            <div className="flex justify-between items-center rounded-3xl p-3 bg-[black] text-[#4D4D4D] font-medium w-20 border-2 border-[#333333] shadow-sm shadow-black">
              <p
                className="cursor-pointer transition ease-in duration-300 hover:text-white text-xl"
                onClick={handleAddPunctuation}
                onMouseEnter={() => handleHover1("Add Punctuation")}
                onMouseLeave={handleMouseLeave1}
              >
                @
              </p>
              <p
                className="cursor-pointer transition ease-in duration-300 hover:text-white text-xl"
                onClick={handleAddNumbers}
                onMouseEnter={() => handleHover1("Add Numbers")}
                onMouseLeave={handleMouseLeave1}
              >
                #
              </p>
            </div>
            {hoverText1 && (
              <p className="text-center text-white mt-2 bg-[#666666] py-2 px-4">
                {hoverText1}
              </p>
            )}
          </div>

          <div className="flex flex-col items-center">
            <div className="flex justify-between items-center rounded-3xl p-3 bg-black text-[#4D4D4D] font-medium w-56 border-2 border-[#333333] shadow-sm shadow-black">
              <p>
                <Clock3
                  className="cursor-pointer transition ease-in duration-300 hover:text-white "
                  onMouseEnter={() => handleHover2("Time")}
                  onMouseLeave={handleMouseLeave2}
                />
              </p>
              <img
                src={quotes}
                alt="quote"
                className="cursor-pointer transition ease-in duration-300 hover:brightness-0 hover:invert"
                onClick={handleQuoteClick}
                onMouseEnter={() => handleHover2("Quotes")}
                onMouseLeave={handleMouseLeave2}
              />
              <img
                src={T}
                alt="text"
                className="text-[#4D4D4D] cursor-pointer transition ease-in duration-300 hover:brightness-0 hover:invert"
                onMouseEnter={() => handleHover2("Words")}
                onMouseLeave={handleMouseLeave2}
              />
            </div>
            {hoverText2 && (
              <p className="text-center text-white mt-2 bg-[#666666] py-2 px-4">
                {hoverText2}
              </p>
            )}
          </div>

          <div className="flex justify-between items-center rounded-3xl p-3 bg-black text-[#4D4D4D] font-medium w-60 border-2 border-[#333333] shadow-sm shadow-[black]">
    <p className="cursor-pointer" onClick={() => handleTimeClick(15)}>
      15
    </p>
    <p className="cursor-pointer" onClick={() => handleTimeClick(30)}>
      30
    </p>
    <p className="cursor-pointer" onClick={() => handleTimeClick(60)}>
      60
    </p>
    <p className="cursor-pointer" onClick={() => handleTimeClick(120)}>
      120
    </p>
  </div>
        </div>
      )}
       {showSharePopup && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <ShareResult  onClose={handleShareClose}/>
        </div>
      )}
    </div>
  );
};

export default Timer_word;

