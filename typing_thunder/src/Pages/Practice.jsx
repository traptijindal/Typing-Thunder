import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import PracticeText from '../components/PracticeText'
import ProgressTracker from '../components/ProgressTracker'
import { useAppContext } from '../context/AppContext.jsx';


const Practice = () => {
  const { userInput,text} = useAppContext();

  return (
    <div className='m-5 md:mt-[25px] lg:mt-[28px] lg:mx-[80px] overflow-hidden static'>
      <Navbar/>
      <ProgressTracker userInput={userInput} text={text} />
      <PracticeText />
      <Footer />
    </div>
  )
}

export default Practice
