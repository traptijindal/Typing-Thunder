import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import ProgressTracker1v1 from "./ProgressTracker1v1";
import Textarea from "./Textarea";
import { useTypingGame } from "../hooks/useTypingGame";
import { calculateProgress } from "../utils/utils";

// Retrieve accessToken from localStorage or other secure source
const accessToken = JSON.parse(localStorage.getItem("user"))?.accessToken;

const socket = io("http://localhost:8000", {
  auth: {
    token: accessToken,
  },
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

const PlayOpponent = () => {
  const [playerName, setPlayerName] = useState("");
  const [opponentName, setOpponentName] = useState("?");
  const [clicked, setClicked] = useState(false);
  const [countdown, setCountdown] = useState(null);
  const [showGame, setShowGame] = useState(false);
  const [roomId, setRoomId] = useState(""); // Store room ID

  const defaultText =
    "Most of them are based on basic text fields that were modified...";
  const {
    randomText,
    isRunning,
    userInput,
    text,
    setUserInput,
    setText,
    progress,
  } = useTypingGame(defaultText);

  const [opponentProgress, setOpponentProgress] = useState(0);
  const [opponentInput, setOpponentInput] = useState("");

  useEffect(() => {
    if (isRunning) {
      const progress = calculateProgress(userInput, text);
      socket.emit("typing-progress", { roomId, progress });
    }

    socket.on("opponent-progress", (data) => {
      setOpponentProgress(data.progress);
    });

    return () => {
      socket.off("opponent-progress");
    };
  }, [userInput, isRunning]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.username) {
      setPlayerName(user.username);
    }

    // Listen for the opponent-found event and join the assigned room
    socket.on("opponent-found", (data) => {
      setOpponentName(data.opponentUsername);
      setRoomId(data.roomId); // Set the room ID
      console.log("Opponent found:", data.opponentUsername);

      // Join the room
      socket.emit("join-room", data.roomId);

      // Start the countdown after opponent is found
      setTimeout(() => {
        startCountdown();
      }, 1000);
    });

    return () => {
      socket.off("opponent-found");
    };
  }, []);

  useEffect(() => {
    if (roomId) {
      socket.on("opponent-input", (key) => {
        setOpponentInput((prev) => prev + key);
      });

      return () => {
        socket.off("opponent-input");
      };
    }
  }, [roomId]);

 

  const startCountdown = () => {
    setCountdown(5);
    const interval = setInterval(() => {
      setCountdown((prevTime) => {
        if (prevTime === 1) {
          clearInterval(interval);
          setShowGame(true);
          return null;
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  const findOpponent = () => {
    if (playerName) {
      socket.emit("find-opponent", { username: playerName });
    } else {
      console.warn("Player name is not set");
    }
    setClicked(true);
  };

  return (
    <>
      {showGame ? (
        <>
          <div>
            <ProgressTracker1v1
              userProgress={progress}
              opponentProgress={opponentProgress}
            />
            <Textarea
              randomText={randomText}
              userInput={userInput}
              setUserInput={setUserInput}
              text={text}
              setText={setText}
              isRunning={isRunning}
              is1v1={true}
              opponentInput={opponentInput}
              setOpponentInput={setOpponentInput}
              roomId={roomId} // Pass roomId to Textarea
              opponentName={opponentName}
            />
          </div>
        </>
      ) : (
        <>
          <div className={`flex justify-center ${countdown !== null ? "opacity-50" : ""}`}>
            <div className="flex items-center justify-center bg-[#333333] h-[210px] w-[430px] rounded-xl">
              <p className="text-4xl text-white font-medium">{playerName}(You)</p>
            </div>

            <div className="flex items-center mx-12">
              <p className="text-white font-bold text-8xl">VS</p>
            </div>

            <div className="flex items-center justify-center bg-[#333333] h-[210px] w-[430px] rounded-xl">
              <p className="text-4xl text-white font-medium">{opponentName}</p>
            </div>
          </div>

          <div className="flex justify-center">
            {!clicked ? (
              <button
                className="h-12 w-60 text-black bg-white py-2 px-4 rounded-xl text-base font-semibold my-5"
                onClick={findOpponent}
              >
                Find Player
              </button>
            ) : (
              <div className="h-12 w-60 rounded-xl my-5" />
            )}
          </div>

          {countdown !== null && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  p-10 rounded-xl text-white text-4xl font-normal">
              Starting in: {countdown}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default PlayOpponent;
