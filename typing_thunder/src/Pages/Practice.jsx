import React,{useState} from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import PracticeText from '../components/PracticeText'
import ProgressTracker from '../components/ProgressTracker'
import { useAppContext } from '../context/AppContext.jsx';
import CutPaste from '../components/CutPaste.jsx'


const Practice = () => {
  const { showButtons,setShowButtons } = useAppContext();
  const [originalText, setOriginalText] = useState('');
  const [userInput, setUserInput] = useState('');
  

  return (
    <div className=' m-5 md:m-0 md:mt-[25px] lg:mt-[28px] lg:mx-[80px] overflow-hidden static '>
      <Navbar/>
      <ProgressTracker userInput={userInput} text={originalText} />
      <CutPaste userInput={userInput} originalText={originalText} setOriginalText={setOriginalText} setUserInput={setUserInput}/>
      <PracticeText userInput={userInput} setUserInput={setUserInput} originalText={originalText} setOriginalText={setOriginalText} showButtons={showButtons} setShowButtons={setShowButtons}/>
      <Footer showButtons={showButtons} />
    </div>
  )
}

export default Practice
