import React from 'react'
import OverallResult from './OverallResult'
import { IoChevronBackOutline } from "react-icons/io5";
import { useLocation } from "react-router-dom";
import {
    calculateAccuracy,
    calculateSpeed,
    calculateRaw,
  } from "../utils/utils.js";

const PlayResult = () => {
    const location = useLocation();
    const { userInput, text, timeLeft, Total_time } = location.state;
    const accuracy = calculateAccuracy(userInput, text);
    const speed = calculateSpeed(userInput, Total_time, timeLeft);
    const raw = calculateRaw(userInput);
   
  return (
    <div className='flex '>
      <div className='bg-[#333333] border-[#B3B3B3]'>
            <div className='flex justify-between'>
                <h1>Lakshayyy(You)</h1>
                <h1>#2</h1>
            </div>
            <OverallResult/>
      </div>

      <div className='bg-[#333333] border-[#B3B3B3]'>
         <div className='flex justify-between'>
            <h1>Apurva</h1>
            <h1>1st</h1>
         </div>

         <div className="flex flex-col ">
          <p className="text-6xl text-white">
            {speed} <span className="text-[#666666] text-2xl">WPM</span>
          </p>
          <p className="text-6xl text-white">
            {accuracy}%{" "}
            <span className="text-[#666666] text-2xl">Accuracy</span>
          </p>
          <p className="text-6xl text-white">
            {Total_time}{" "}
            <span className="text-[#666666] text-2xl">Seconds</span>
          </p>
          <p className="text-6xl text-white">
            {raw} <span className="text-[#666666] text-2xl">Raw</span>
          </p>
        </div>

        <p className='cursor-pointer'><span><IoChevronBackOutline /></span>Expand results</p>
      </div>


    </div>
  )
}

export default PlayResult
