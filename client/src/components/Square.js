import React from "react";
import socket from "../api";

const Square = (props) => {
  const renderValue = (value) => {
    return value === "1" ? "✕" : value === "-1" ? "◯" : "";
  };

  const playerMove = () => {
    if (
      props.gameState.playerOneTurn === props.gameState.isPlayerOne &&
      props.gameState.gameGrid[props.index] === 0
    ) {
      props.gameState.isPlayerOne
        ? socket.emit("player_move", props.index, 1)
        : socket.emit("player_move", props.index, -1);
    }
  };

  return (
    <div className="square-inner" onClick={playerMove}>
      {renderValue(props.value)}
    </div>
  );
};

export default Square;
