import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import useNavigate and Link
import { calculateAccuracy, calculateSpeed } from '../utils/utils';
import ActionButtons from './ActionButtons';
import ShareResult from './ShareResult';

const PracticeText = ({ userInput, originalText, setUserInput,setShowButtons }) => {

  const [timeUp, setTimeUp] = useState(false);
  const [speed, setSpeed] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [timeSelected, setTimeSelected] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState();
  const [Total_time, setTime] = useState();
  const [showSharePopup, setShowSharePopup] = useState(false);
  const [showText,setShowText] = useState(true);

  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      const calculatedAccuracy = calculateAccuracy(userInput, originalText);
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
    setTimeUp(false);
    setTime(seconds);
    setTimeSelected(true);
    setShowText(false);
    setShowButtons(false);
  };

  const resetUserInput = () => {
    setUserInput("");
    setIsRunning(true);
    setTimeLeft(Total_time);
    setTimeUp(false);
  };

  const handleNext = () => {
    navigate('/result', { 
      state: { 
        userInput, 
        text: originalText, 
        timeLeft, 
        Total_time 
      } 
    });
  };

  const handleShareClick= () =>{
    setShowSharePopup(true);
  }

  const handleShareClose = ()=>{
    setShowSharePopup(false);
  }

  return (
    <div>
      <div className="flex justify-center mb-4">
        {!timeSelected ? (
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
        ) : !timeUp ? (
          <p className="text-center text-white mb-6">Time: {timeLeft}</p>
        ) : (
          <div>
            <div className="flex justify-center">
              <p className="mr-14">
                <span className="text-5xl text-white">{speed}</span>
                <span className="text-xl text-[#666666]"> WPM</span>
              </p>
              <p className="mr-14">
                <span className="text-5xl text-white">{accuracy}%</span>
                <span className="text-xl text-[#666666]"> Accuracy</span>
              </p>
              <p className="">
                <span className="text-5xl text-white">{Total_time}</span>
                <span className="text-xl text-[#666666]"> Seconds</span>
              </p>
            </div>
            <ActionButtons onRestart={resetUserInput} handleNext={handleNext} onShareClick={handleShareClick}/>
          </div>
        )}
      </div>
      {showText &&(
        <p className="text-[#666666] text-center text-lg mb-6">
         Simply paste your text and start typing words to practice over that particular text.
      </p>
      )}

      {showSharePopup && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <ShareResult  onClose={handleShareClose}/>
        </div>
      )}
    </div>
  );
};

export default PracticeText;
