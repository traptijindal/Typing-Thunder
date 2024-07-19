import React from 'react'
import mail from  "/mail.png"
import twitter from  "/twitter.png"
import discord from  "/discord.png"
import support from  "/support.png"
import privacy from  "/privacy.png"
import github from  "/github.png"
import security from  "/security.png"


const Footer = ({showButtons}) => {
  return (
<>
{showButtons &&(
    <div className='flex justify-center gap-[24px] '>
    <div className='flex space-x-2 text-[#666666]'>
    <img src={mail} alt="" />
      <p className='text-xs '>Contact</p>
    </div>

    <div className='flex space-x-2 text-[#666666]'>
    <img src={twitter} alt="" />
    <p className='text-xs'>Twitter</p>
    </div>

    <div className='flex space-x-2 text-[#666666]'>
      <img src={discord} alt="" />
        <p className='text-xs'>Discord</p>
    </div>

    <div className='flex space-x-2 text-[#666666]'>
      <img src={github} alt="" />
       <p className='text-xs'>Github</p>
    </div>

    <div className='flex space-x-2 text-[#666666]'>
      <img src={security} alt="" />
      <p className='text-xs'>Security</p>
    </div>

    <div className='flex space-x-2 text-[#666666]'>
      <img src={privacy} alt="" />
      <p className='text-xs'>Privacy</p>
    </div>

    <div className='flex space-x-2 text-[#666666]'>
      <img src={support} alt="" />
      <p className='text-xs'>Support</p>
    </div>
  </div>
   )}</>
  )
}

export default Footer
