import React from 'react'
import profile from "/Frame 67.png";


import { calculateProgress } from "../utils/utils.js";

const ProgressTracker = ({userInput,text}) => {
   const progress = calculateProgress(userInput, text);
  return (
    <div className="flex justify-center">
        <div className="relative flex mb-20 w-full max-w-60 md:max-w-lg lg:max-w-2xl my-8">
          <img
            src={profile}
            alt="profile"
            className="absolute bottom-4 transition-transform duration-300"
            style={{ left: `${progress}%`, transform: "translateX(-50%)" }}
          />
          <div
            className="absolute w-full h-1"
            style={{
              background: `linear-gradient(to right, white ${progress}%, #666666 ${progress}%)`,
            }}
          ></div>
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
  )
}

export default ProgressTracker
