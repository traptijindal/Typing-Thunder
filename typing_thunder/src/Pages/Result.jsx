import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ActionButtons from "../components/ActionButtons";
import ShareResult from "../components/ShareResult.jsx";
import OverallResult from "../components/OverallResult.jsx";


const Result = () => {
const [showSharePopup, setShowSharePopup] = useState(false);

  const handleShareClick = () => {
    setShowSharePopup(true);
  };

  const handleShareClose = () => {
    setShowSharePopup(false);
  };

  return (
    <div className="m-5 md:mt-[25px] lg:mt-[28px] lg:mx-[80px] overflow-hidden static">
      <Navbar />
      <OverallResult />
      <ActionButtons onShareClick={handleShareClick} />
      <Footer />
      {showSharePopup && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <ShareResult onClose={handleShareClose} />
        </div>
      )}
    </div>
  );
};

export default Result;
