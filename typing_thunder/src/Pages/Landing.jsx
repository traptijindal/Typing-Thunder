import React, {useState} from 'react'
import Navbar from '../components/Navbar'
import Textarea from '../components/Textarea'
import Footer from '../components/Footer'
import Timer_word from '../components/Timer_word'


const Landing = () => {
  const [randomText, setRandomText] = useState('');
  const [randomPunctuation, setAddPunctuation] = useState(false);
  const [randomNumber, setAddNumbers] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [showButtons,setShowButtons] = useState(true);
  return (
    <div className='m-5 md:mt-[25px] lg:mt-[28px] lg:mx-[80px] overflow-hidden static'>
      <Navbar/>
      <Textarea 
      randomText={randomText} 
      randomPunctuation={randomPunctuation} 
      randomNumber={randomNumber} 
      // isRunning={isRunning}
      // speed={speed}
      // accuracy={accuracy}
      />
      <Timer_word setRandomText={setRandomText} setAddPunctuation={setAddPunctuation} setAddNumbers={setAddNumbers}  isRunning={isRunning} setIsRunning={setIsRunning} showButtons={showButtons} setShowButtons={setShowButtons}/>
      <Footer showButtons={showButtons} />
    </div>
  )
}

export default Landing
