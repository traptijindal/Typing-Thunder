import React from 'react'
import { Clock3 } from 'lucide-react';
import quotes from "/Double_Quotes_L.png"
import T from "/T.png"

const Timer_word = () => {
  return (
    <div className='flex  justify-center space-x-6  mb-16'>
      <div className='flex justify-between items-center rounded-3xl p-3 bg-[black] text-[#4D4D4D] font-medium w-20 border-2 border-[#333333] shadow-sm shadow-black'>
           <p>@</p>
           <p>#</p>
      </div>
      <div className='flex  justify-between items-center rounded-3xl p-3 bg-black text-[#4D4D4D] font-medium w-56 border-2 border-[#333333] shadow-sm shadow-black'>
        <p><Clock3 className=""/></p>
      <img src={quotes} alt="image" />
      <img src={T} alt="image" className='text-[#4D4D4D]'/>
      </div>

      <div className='flex  justify-between items-center rounded-3xl p-3 bg-black text-[#4D4D4D] font-medium w-60 border-2 border-[#333333] shadow-sm shadow-[black]'>
        <p>15</p>
        <p>30</p>
        <p>60</p>
        <p>120</p>
      </div>
      <div>

      </div>
    </div>
  )
}

export default Timer_word
