// import React from "react";

// const PlayOpponent = () => {
//   return (
//     <>
//       <div className="flex justify-center">
//         <div className="flex items-center justify-center bg-[#333333] h-[210px] w-[430px] rounded-xl">
//           <p className="text-4xl text-white font-medium">Lakshayyy(You)</p>
//         </div>

//         <div className="flex items-center mx-12">
//         <p className="text-white font-bold text-8xl">VS</p>
//         </div>

//         <div className="flex items-center justify-center bg-[#333333] h-[210px] w-[430px] rounded-xl">
//           <p className="text-6xl text-white font-medium">?</p>
//         </div>
//       </div>

//       <div className="flex justify-center">
//       <button className="h-12 w-60 text-black bg-white py-2 px-4 rounded-xl text-base font-semibold my-5">
//         Find Player
//       </button>
//       </div>
//     </>
//   );
// };

// export default PlayOpponent;


import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io(process.env.REACT_APP_SOCKET_URL);

const PlayOpponent = () => {
  const [username, setUsername] = useState('');
  const [opponent, setOpponent] = useState(null);

  useEffect(() => {
    // Retrieve the username from local storage
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser && storedUser.username) {
      setUsername(storedUser.username);
    }

    socket.on('match_found', (data) => {
      setOpponent(data.opponent);
    });

    return () => {
      socket.off('match_found');
    };
  }, []);

  const handleFindPlayer = () => {
    socket.emit('find_opponent', username);
  };

  return (
    <>
      <div className="flex justify-center">
        <div className="flex items-center justify-center bg-[#333333] h-[210px] w-[430px] rounded-xl">
          <p className="text-4xl text-white font-medium">{username}(You)</p>
        </div>

        <div className="flex items-center mx-12">
          <p className="text-white font-bold text-8xl">VS</p>
        </div>

        <div className="flex items-center justify-center bg-[#333333] h-[210px] w-[430px] rounded-xl">
          <p className="text-6xl text-white font-medium">{opponent || '?'}</p>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          className="h-12 w-60 text-black bg-white py-2 px-4 rounded-xl text-base font-semibold my-5"
          onClick={handleFindPlayer}
        >
          Find Player
        </button>
      </div>
    </>
  );
};

export default PlayOpponent;
