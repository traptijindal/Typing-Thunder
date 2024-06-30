import React from 'react'
import Navbar from '../components/Navbar'
import Textarea from '../components/Textarea'
import Footer from '../components/Footer'
import Timer_word from '../components/Timer_word'


const Landing = () => {
  return (
    <div className='m-5 md:mt-[25px] lg:mt-[28px] lg:mx-[80px] overflow-hidden '>
      <Navbar/>
      <Textarea/>
      <Timer_word/>
      <Footer/>
    </div>
  )
}

export default Landing
