// import React from 'react';
// import { FaArrowLeft } from "react-icons/fa";
// import Facebook from '/Facebook.png';
// import Instagram from '/Insta.png';
// import Reddit from '/Group.png';
// import Whatsapp from '/WhatsApp.png';

// const ShareResult = ({onClose}) => {
//   return (
//     <div className='flex justify-center items-center min-h-screen px-4 sm:px-6 '>
//       <div className='flex flex-col w-full max-w-[450px] h-auto md:h-72 border border-[#4D4D4D] p-4 md:p-7 rounded-lg bg-[#1A1A1A]'>
//         <div className='flex items-center mb-4'>
//           <FaArrowLeft className='mr-2 text-white cursor-pointer' onClick={onClose}/>
//           <p className='text-white font-semibold text-lg md:text-xl'>Share your results</p>
//         </div>

//         <p className='text-[#B3B3B3] mb-6 md:mb-7 text-sm'>
//           If you want to flex your result, share it with your friends
//         </p>

//         <div className='flex justify-between gap-3 md:gap-7 mb-6 md:mb-7'>
//           <div className='flex flex-col items-center'>
//             <img src={Instagram} alt="Instagram" className='w-10 h-10 md:w-auto md:h-auto mb-2'/>
//             <p className='text-[#888888] text-xs'>Instagram</p>
//           </div>

//           <div className='flex flex-col items-center'>
//             <img src={Facebook} alt="Facebook" className='w-10 h-10 md:w-auto md:h-auto mb-2'/>
//             <p className='text-[#888888] text-xs'>Facebook</p>
//           </div>

//           <div className='flex flex-col items-center'>
//             <img src={Reddit} alt="Reddit" className='w-10 h-10 md:w-auto md:h-auto mb-2'/>
//             <p className='text-[#888888] text-xs'>Reddit</p>
//           </div>

//           <div className='flex flex-col items-center'>
//             <img src={Whatsapp} alt="WhatsApp" className='w-10 h-10 md:w-auto md:h-auto mb-2'/>
//             <p className='text-[#888888] text-xs'>WhatsApp</p>
//           </div>
//         </div>

//         <div className='border border-[#4D4D4D] p-4 rounded-lg'>
//           {/* Additional content can go here */}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ShareResult;

import React,{useState} from 'react';
import { FaArrowLeft } from "react-icons/fa";
import Facebook from '/Facebook.png';
import Instagram from '/Insta.png';
import Reddit from '/Group.png';
import Whatsapp from '/WhatsApp.png';
import html2canvas from 'html2canvas';
import copy from '/copy.png';

const ShareResult = ({ onClose }) => {
  const [screenshotLink, setScreenshotLink] = useState('');

  const handleShare = async (platform) => {
    
    onClose();

    
    setTimeout(async () => {
      try {
       
        const canvas = await html2canvas(document.body);
        const imageBlob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
        
        
        const link = URL.createObjectURL(imageBlob);
        setScreenshotLink(link);

        const shareData = {
          title: 'Typing Test Results',
          text: 'Check out my typing test results!',
          files: [
            new File([imageBlob], 'result.png', { type: 'image/png' })
          ],
        };

        
        if (navigator.canShare && navigator.canShare({ files: shareData.files })) {
          await navigator.share(shareData);
          console.log('Share successful');
        } else {
          console.log('Sharing is not supported or failed.');
        }
      } catch (error) {
        console.error('Share failed:', error);
      }
    }, 500); 
  };

  const handleCopyLink = () => {
    if (screenshotLink) {
      navigator.clipboard.writeText(screenshotLink);
      console.log('Link copied to clipboard');
    }
  };
  
  return (
    <div className='flex justify-center items-center min-h-screen px-4 sm:px-6'>
      <div className='flex flex-col w-full max-w-[450px] h-auto md:h-72 border border-[#4D4D4D] p-4 md:p-7 rounded-lg bg-[#1A1A1A]'>
        <div className='flex items-center mb-4'>
          <FaArrowLeft className='mr-2 text-white cursor-pointer' onClick={onClose} />
          <p className='text-white font-semibold text-lg md:text-xl'>Share your results</p>
        </div>

        <p className='text-[#B3B3B3] mb-6 md:mb-7 text-sm'>
          If you want to flex your result, share it with your friends
        </p>

        <div className='flex justify-between gap-3 md:gap-7 mb-6 md:mb-7'>
          <div className='flex flex-col items-center cursor-pointer'>
            <img src={Instagram} alt="Instagram" className='w-10 h-10 md:w-auto md:h-auto mb-2' onClick={() => handleShare('Instagram')} />
            <p className='text-[#888888] text-xs'>Instagram</p>
          </div>

          <div className='flex flex-col items-center cursor-pointer'>
            <img src={Facebook} alt="Facebook" className='w-10 h-10 md:w-auto md:h-auto mb-2' onClick={() => handleShare('Facebook')} />
            <p className='text-[#888888] text-xs'>Facebook</p>
          </div>

          <div className='flex flex-col items-center cursor-pointer'>
            <img src={Reddit} alt="Reddit" className='w-10 h-10 md:w-auto md:h-auto mb-2' onClick={() => handleShare('Reddit')} />
            <p className='text-[#888888] text-xs'>Reddit</p>
          </div>

          <div className='flex flex-col items-center cursor-pointer'>
            <img src={Whatsapp} alt="WhatsApp" className='w-10 h-10 md:w-auto md:h-auto mb-2' onClick={() => handleShare('Whatsapp')} />
            <p className='text-[#888888] text-xs'>WhatsApp</p>
          </div>
        </div>

        <div className='border border-[#4D4D4D] p-2 rounded-lg flex justify-between items-center'>
          <a href={screenshotLink} target="_blank" rel="noopener noreferrer" className="text-[#888888] text-xs break-all">
            {screenshotLink ? screenshotLink : "Generating link..."}
          </a>
          <img src={copy} alt="Copy Link" className="cursor-pointer" onClick={handleCopyLink} />
        </div>
      </div>
    </div>
  );
}

export default ShareResult;
