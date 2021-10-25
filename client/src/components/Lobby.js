import React, { useEffect, useState } from "react";
import Game from "./Game";
import Waiting from "./Waiting";
import socket from "../api";

const Lobby = (props) => {
  const [propsData, setPropsData] = useState({
    isPlayerOne: props.isPlayerOne,
    joiningCode: props.joiningCode,
    gameState: props.gameState,
  });

  useEffect(() => {
    socket.on("update", (gameState) => {
      setPropsData((prevPropsData) => {
        return {
          ...prevPropsData,
          gameState,
        };
      });
    });
  }, []);

  return (
    <div>
      {props.waitingForPlayer && (
        <Waiting joiningCode={propsData.joiningCode} />
      )}
      {!props.waitingForPlayer && (
        <Game
          gameState={propsData.gameState}
          isPlayerOne={propsData.isPlayerOne}
        />
      )}
    </div>
  );
};

export default Lobby;
