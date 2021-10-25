import React from "react";
import Square from "./Square";

const Board = (props) => {
  const gameState = props.gameState;

  return (
    <div className="board">
      {gameState.gameGrid.map((value, index) => {
        return (
          <Square
            value={value.toString()}
            key={index}
            index={index}
            gameState={{ isPlayerOne: props.isPlayerOne, ...gameState }}
          />
        );
      })}
    </div>
  );
};

export default Board;
