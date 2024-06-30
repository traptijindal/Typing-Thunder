import React from 'react'

const Textarea = () => {
  return (
    <div className='mb-24'>
        <div  className='flex  justify-center '>
        <div className="relative flex  mb-20 w-full max-w-3xl my-8">
        <div className="absolute w-full h-0.5 bg-[#666666]"></div>
        <div className="relative w-full flex justify-between">
          <div>
          <div className="absolute left-0 transform -translate-x-1/2 -translate-y-1/2 h-4 w-4 bg-[#666666] rounded-full "></div>
          <div className='text-[#666666] mt-4 absolute left-0 transform -translate-x-1/2 -translate-y-1/2 h-4 w-4'>Start</div>
          </div>
         <div>
         <div className="absolute right-0 transform translate-x-1/2 -translate-y-1/2 h-4 w-4 bg-[#666666] rounded-full"></div>
        <div className='text-[#666666] mt-4 absolute right-0 transform -translate-x-1/2 -translate-y-1/2 h-4 w-4'>End</div>
         </div>
        </div>
      </div>
        </div>
      <div className='text-2xl text-[#666666] text-start font-ocr'>
        <p>Most of them are based on basic text fields that were modified to better handle specific types of information, like the credit card numbers. Here are just a few examples of input types that are most commonly used throughout UIs we creating.</p>
      </div>
    </div>
  )
}

export default Textarea
