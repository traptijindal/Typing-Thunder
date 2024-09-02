// src/components/ActionButtons.jsx
import React from "react";

const ActionButtons = ({
  onRestart,
  onNextHover,
  onRestartHover,
  onShareHover,
  handleNext,
 onShareClick
}) => {
  const [hoverTextNext, setHoverTextNext] = React.useState(false);
  const [hoverTextRestart, setHoverTextRestart] = React.useState(false);
  const [hoverTextShare, setHoverTextShare] = React.useState(false);

  return (
    <div className="flex justify-center my-9 space-x-44">
      <div>
        <img
          src="/next.png"
          alt="Next"
          onClick={handleNext}
          //   onMouseEnter={() => {
          //     setHoverTextNext(true);
          //     if (onNextHover) onNextHover();
          //   }}
          //   onMouseLeave={() => setHoverTextNext(false)}
          className="hover:cursor-pointer transition ease-in duration-300 hover:brightness-0 hover:invert"
        />

        {/* {hoverTextNext && <p>Next</p>} */}
      </div>

      <div>
        <img
          src="/icons8-restart 1.png"
          alt="Restart"
          onClick={onRestart}
          //   onMouseEnter={() => {
          //     setHoverTextRestart(true);
          //     if (onRestartHover) onRestartHover();
          //   }}
          //   onMouseLeave={() => setHoverTextRestart(false)}
          className="hover:cursor-pointer transition ease-in duration-300 hover:ease-out hover:brightness-0 hover:invert"
        />
        {/* {hoverTextRestart && <p>Restart</p>} */}
      </div>

      <div>
        <img
          src="/Share_Android.png"
          alt="Share"
          onClick={onShareClick}
          //   onMouseEnter={() => {
          //     setHoverTextShare(true);
          //     if (onShareHover) onShareHover();
          //   }}
          //   onMouseLeave={() => setHoverTextShare(false)}
          className="hover:cursor-pointer transition ease-in duration-300 hover:ease-out hover:brightness-0 hover:invert"
        />
        {/* {hoverTextShare && <p>Share</p>} */}
      </div>
    </div>
  );
};

export default ActionButtons;
