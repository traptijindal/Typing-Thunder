import React from 'react'


const Time = () => {


  const handleTimeClick = (seconds) => {
    setTimeLeft(seconds);
    setIsRunning(true);
    setShowButtons(false);
    setTimeUp(false);
    setTime(seconds);
  };
  return (
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
  )
}

export default Time
