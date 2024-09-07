import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import PlayResult from '../components/PlayResult'

const Play1v1Result = () => {
  return (
    <div className="m-5 md:mt-[25px] lg:mt-[28px] lg:mx-[80px] overflow-hidden static">
      <Navbar/>
      <PlayResult/>
      <Footer/>
    </div>
  )
}

export default Play1v1Result
