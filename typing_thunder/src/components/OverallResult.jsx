import React from "react";
import { useLocation } from "react-router-dom";
import {
    calculateAccuracy,
    calculateSpeed,
    calculateIncorrect,
    calculateCorrect,
    calculateMissed,
    calculateExtra,
    calculateRaw,
  } from "../utils/utils.js";

const OverallResult = () => {
    const location = useLocation();
    const { userInput, text, timeLeft, Total_time } = location.state;
    const incorrect = calculateIncorrect(userInput, text);
    const accuracy = calculateAccuracy(userInput, text);
    const speed = calculateSpeed(userInput, Total_time, timeLeft);
    const correct = calculateCorrect(userInput, text);
    const missed = calculateMissed(userInput, text);
    const raw = calculateRaw(userInput);
    const extra = calculateExtra(userInput, text);
  return (
    <div className="flex flex-col items-center justify-center text-white p-4">
        <div className="flex space-x-24">
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
        <div className="mt-6 text-xl">
          <p className="text-gray-400 text-2xl mb-5 mt-10">Characters</p>
          <div className="flex space-x-24">
            <p className="text-6xl text-white">
              {correct} <span className="text-[#666666] text-2xl">Correct</span>
            </p>
            <p className="text-6xl text-white">
              {incorrect}{" "}
              <span className="text-[#666666] text-2xl">Incorrect</span>
            </p>
            <p className="text-6xl text-white">
              {extra} <span className="text-[#666666] text-2xl">Extra</span>
            </p>
            <p className="text-6xl text-white">
              {missed} <span className="text-[#666666] text-2xl">Missed</span>
            </p>
          </div>
        </div>
    </div>
  )
}

export default OverallResult
