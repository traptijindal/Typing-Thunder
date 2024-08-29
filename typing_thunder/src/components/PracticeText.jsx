import React,{useEffect, useState} from 'react'
import { useAppContext } from '../context/AppContext';
import { calculateAccuracy,
         calculateSpeed
 } from '../utils/utils';

const PracticeText = () => {
  const [timeUp,setTimeUp] = useState(false);
  const { userInput,text,isRunning,setIsRunning,timeLeft,setTimeLeft,Total_time,setTime } = useAppContext();

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


  return (
    <div >
         <div className='flex justify-center mb-7'>
           <p>Time:{timeLeft}</p>
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
      <p className='text-[#666666] text-center text-xl'>Start typing words to practice or simply paste your text to practice over that particular text.</p>
    </div>
  )
}

export default PracticeText
