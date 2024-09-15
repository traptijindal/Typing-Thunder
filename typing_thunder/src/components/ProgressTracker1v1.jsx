import React from "react";
import profile from "/Frame 67.png"; // Assuming same image for both users

import { calculateProgress } from "../utils/utils.js";

const ProgressTracker1v1 = ({ userInput, opponentInput, text }) => {
  // Calculate the progress for both players
  const userProgress = calculateProgress(userInput, text);
  const opponentProgress = calculateProgress(opponentInput, text);

  return (
    <div className="flex justify-center">
      <div className="relative flex mb-20 w-full max-w-60 md:max-w-lg lg:max-w-2xl my-8">
        {/* Progress Bar */}
        <div
          className="absolute w-full h-1"
          style={{
            background: `linear-gradient(to right, green ${userProgress}%, red ${opponentProgress}%, #666666 ${Math.max(
              userProgress,
              opponentProgress
            )}%)`,
          }}
        ></div>

        {/* User's Icon */}
        <img
          src={profile}
          alt="user"
          className="absolute bottom-4 transition-transform duration-300"
          style={{ left: `${userProgress}%`, transform: "translateX(-50%)" }}
        />

        {/* Opponent's Icon */}
        <img
          src={profile}
          alt="opponent"
          className="absolute bottom-7 transition-transform duration-300"
          style={{ left: `${opponentProgress}%`, transform: "translateX(-50%)" }}
        />

        {/* Start and End Markers */}
        <div className="relative w-full flex justify-between">
          <div>
            <div className="absolute left-0 transform -translate-x-1/2 -translate-y-1/2 h-4 w-4 bg-[#666666] rounded-full"></div>
            <div className="text-[#666666] mt-4 absolute left-0 transform translate-x-1/2 -translate-y-1/2 h-4 w-4">
              Start
            </div>
          </div>
          <div>
            <div className="absolute right-0 transform translate-x-1/2 -translate-y-1/2 h-4 w-4 bg-[#666666] rounded-full"></div>
            <div className="text-[#666666] mt-4 absolute right-0 transform translate-x-1/2 -translate-y-1/2 h-4 w-4">
              End
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker1v1;



