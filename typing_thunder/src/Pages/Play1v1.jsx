import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAppContext } from '../context/AppContext';
import PlayText from '../components/PlayText';
import PlayOpponent from '../components/PlayOpponent';

const Play1v1 = () => {
   const {showButtons,setShowButtons} =useAppContext();

  return (
    <div className="m-5 md:m-0 md:mt-[25px] lg:mt-[28px] lg:mx-[80px] overflow-hidden static">
      <Navbar/>
      <PlayOpponent/>
      <PlayText/>
      <Footer showButtons={showButtons} />
    </div>
  )
}

export default Play1v1
