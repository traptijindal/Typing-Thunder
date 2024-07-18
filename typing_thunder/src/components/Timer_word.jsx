// import React from 'react'
// import { Clock3 } from 'lucide-react';
// import quotes from "/Double_Quotes_L.png"
// import T from "/T.png"

// const Timer_word = () => {
//   return (
//     <div className='flex  justify-center space-x-6  mb-16'>
//       <div className='flex justify-between items-center rounded-3xl p-3 bg-[black] text-[#4D4D4D] font-medium w-20 border-2 border-[#333333] shadow-sm shadow-black'>
//            <p className='cursor-pointer'>@</p>
//            <p className='cursor-pointer'>#</p>
//       </div>
//       <div className='flex  justify-between items-center rounded-3xl p-3 bg-black text-[#4D4D4D] font-medium w-56 border-2 border-[#333333] shadow-sm shadow-black'>
//         <p><Clock3 className="cursor-pointer"/></p>
//       <img src={quotes} alt="image" className='cursor-pointer'/>
//       <img src={T} alt="image" className='text-[#4D4D4D] cursor-pointer'/>

      
//       </div>



//       <div className='flex  justify-between items-center rounded-3xl p-3 bg-black text-[#4D4D4D] font-medium w-60 border-2 border-[#333333] shadow-sm shadow-[black]'>
//         <p className='cursor-pointer'>15</p>
//         <p className='cursor-pointer'>30</p>
//         <p className='cursor-pointer'>60</p>
//         <p className='cursor-pointer'>120</p>
//       </div>
//       <div>

//       </div>
//     </div>
//   )
// }

// export default Timer_word

import React, { useState } from 'react';
import { Clock3 } from 'lucide-react';
import quotes from "/Double_Quotes_L.png";
import T from "/T.png";

const Timer_word = ({ setRandomText, setAddPunctuation, setAddNumbers }) => {
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
     "The aroma of a home-cooked meal filled the house, promising a delicious feast. Family and friends gathered around the table, sharing stories and laughter, creating cherished memories."

];

  const generateRandomText = () => {
    const randomIndex = Math.floor(Math.random() * texts.length);
    return texts[randomIndex];
  };

const generatePunctuation = () =>{
  const randomIndex = Math.floor(Math.random() * texts.length);
  const random = texts[randomIndex];
  return random.split(' ').map(word => {
    const randomIndex = Math.floor(Math.random() * word.length);
    const punctuation = '.,!?'.charAt(Math.floor(Math.random() * 4));
    return word.slice(0, randomIndex) + punctuation + word.slice(randomIndex);
  }).join(' ');
};

const generateNumbers = () =>{
  const randomIndex = Math.floor(Math.random() * texts.length);
  const random = texts[randomIndex];
  return random.split(' ').map(word => {
    const randomIndex = Math.floor(Math.random() * word.length);
    const numbers = '1234567890'.charAt(Math.floor(Math.random() * 4));
    return word.slice(0, randomIndex) + numbers+ word.slice(randomIndex);
  }).join(' ');
}
  

  const handleQuoteClick = () => {
    const randomText = generateRandomText();
    setRandomText(randomText);
  };

  const handleAddPunctuation = () => {
    const randomPunctuation= generatePunctuation();
    setAddPunctuation(randomPunctuation);
  };

  const handleAddNumbers = () => {
    const randomNumber = generateNumbers();
    setAddNumbers(randomNumber);
  };

  return (
    <div className='flex justify-center space-x-6 mb-16'>
      <div className='flex justify-between items-center rounded-3xl p-3 bg-[black] text-[#4D4D4D] font-medium w-20 border-2 border-[#333333] shadow-sm shadow-black'>
        <p className='cursor-pointer' onClick={handleAddPunctuation}>@</p>
        <p className='cursor-pointer' onClick={handleAddNumbers}>#</p>
      </div>
      <div className='flex justify-between items-center rounded-3xl p-3 bg-black text-[#4D4D4D] font-medium w-56 border-2 border-[#333333] shadow-sm shadow-black'>
        <p><Clock3 className="cursor-pointer"/></p>
        <img src={quotes} alt="quote" className='cursor-pointer' onClick={handleQuoteClick} />
        <img src={T} alt="text" className='text-[#4D4D4D] cursor-pointer'/>
      </div>
      <div className='flex justify-between items-center rounded-3xl p-3 bg-black text-[#4D4D4D] font-medium w-60 border-2 border-[#333333] shadow-sm shadow-[black]'>
        <p className='cursor-pointer'>15</p>
        <p className='cursor-pointer'>30</p>
        <p className='cursor-pointer'>60</p>
        <p className='cursor-pointer'>120</p>
      </div>
    </div>
  );
};

export default Timer_word;