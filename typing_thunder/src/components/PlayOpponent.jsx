 import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import ProgressTracker1v1 from "./ProgressTracker1v1";
import Textarea from "./Textarea";
import { useTypingGame } from "../hooks/useTypingGame";
import { calculateProgress } from "../utils/utils";

const socket = io("http://localhost:8000");

const PlayOpponent = () => {
  const [playerName, setPlayerName] = useState("");
  const [opponentName, setOpponentName] = useState("?");
  const [clicked, setClicked] = useState(false);
  const [countdown, setCountdown] = useState(null);
  const [showGame, setShowGame] = useState(false);
  const [roomId, setRoomId] = useState("");
  const [progress, setProgress] = useState(0); // Player progress
  const [opponentProgress, setOpponentProgress] = useState(0); // Opponent progress
  const [opponentInput, setOpponentInput] = useState("");

  const defaultText = "Most of them are based on basic text fields that were modified...";
  const {
    randomText,
    isRunning,
    userInput,
    text,
    setUserInput,
    setText,
  } = useTypingGame(defaultText);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.username) {
      setPlayerName(user.username);
    }

    // Listen for opponent finding and room joining
    socket.on("opponent-found", (data) => {
      setOpponentName(data.opponentUsername);
      setRoomId(data.roomId);
      console.log("Opponent found:", data.opponentUsername);

      socket.emit("join-room", data.roomId);

      setTimeout(() => {
        startCountdown();
      }, 1000);
    });

    // Listen for progress updates from the server
    socket.on("progressUpdate", ({ userId, progress }) => {
      console.log("Received progress update:", { userId, progress });
      if (userId === socket.id) {
        setProgress(progress);
      } else {
        setOpponentProgress(progress);
      }
    });

    return () => {
      socket.off("opponent-found");
      socket.off("progressUpdate");
    };
  }, []);

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

  const handleUserInput = (input) => {
    setUserInput(input);
    const progress = calculateProgress(input, text);
    socket.emit("updateProgress", progress); // Send progress to the server
  };

  const handleOpponentInput = (input) => {
    setOpponentInput(input);
    const progress = calculateProgress(input, text);
    socket.emit("updateProgress", progress); // Send opponent's progress to the server
  };

  return (
    <>
      {showGame ? (
        <>
          <div>
            <ProgressTracker1v1
              userInput={userInput}
              opponentInput={opponentInput}
              text={text}
            />
            <Textarea
              randomText={randomText}
              userInput={userInput}
              setUserInput={handleUserInput}
              text={text}
              setText={setText}
              isRunning={isRunning}
              is1v1={true}
              opponentInput={opponentInput}
              setOpponentInput={handleOpponentInput}
              roomId={roomId}
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
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-10 rounded-xl text-white text-4xl font-normal">
              Starting in: {countdown}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default PlayOpponent;
