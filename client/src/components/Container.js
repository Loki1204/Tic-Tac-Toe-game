import React, { useEffect, useState } from "react";
import LandingPage from "./LandingPage";
import Lobby from "./Lobby";
import socket from "../api";

const Container = () => {
  const [gameData, setGameData] = useState({
    landingPage: true,
    lobbyPage: false,
    playerName: "",
    waitingForPlayer: true,
    joiningCode: "",
    isPlayerOne: false,
    gameState: {
      playerOneName: "",
      playerTwoName: "",
      playerOneScore: 0,
      playerTwoScore: 0,
      ties: 0,
      playerOneTurn: true,
      gameGrid: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
  });

  useEffect(() => {
    socket.on("session_created", (playerName, joiningCode) => {
      setGameData((prevGameData) => {
        return {
          ...prevGameData,
          landingPage: false,
          lobbyPage: true,
          playerName,
          joiningCode,
          isPlayerOne: true,
        };
      });
    });

    socket.on("valid_joiningCode", (gameState) => {
      setGameData((prevGameData) => {
        return {
          ...prevGameData,
          waitingForPlayer: false,
          landingPage: false,
          lobbyPage: true,
          gameState,
        };
      });
    });
  }, []);

  return (
    <>
      {gameData.landingPage && <LandingPage />}
      {gameData.lobbyPage && (
        <Lobby
          gameState={gameData.gameState}
          waitingForPlayer={gameData.waitingForPlayer}
          joiningCode={gameData.joiningCode}
          isPlayerOne={gameData.isPlayerOne}
        />
      )}
    </>
  );
};

export default Container;
