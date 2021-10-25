import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Spinner } from "react-bootstrap";

const Stats = (props) => {
  const centeredStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
  return (
    <AnimatePresence>
      <motion.div
        className="stats"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {props.gameState.playerOneTurn === props.isPlayerOne && (
          <div className="turn">
            <h5>Your Turn</h5>
          </div>
        )}

        {props.gameState.playerOneTurn !== props.isPlayerOne && (
          <div
            className="turn"
            style={{ display: "grid", gridTemplateRows: "1fr 1fr" }}
          >
            <h5>
              {props.isPlayerOne
                ? props.gameState.playerTwoName
                : props.gameState.playerOneName}
              's Turn
            </h5>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Spinner color="dark"></Spinner>
            </div>
          </div>
        )}

        <div
          style={{
            width: "100%",
            height: "100%",
            display: "grid",
            gridTemplateRows: "1fr 1fr",
            gridTemplateColumns: "1fr 1fr 1fr",
          }}
        >
          <div style={centeredStyle}>
            <p>Wins</p>
          </div>
          <div style={centeredStyle}>
            <p>Ties</p>
          </div>
          <div style={centeredStyle}>
            <p>Losses</p>
          </div>

          <div style={centeredStyle}>
            <p>
              {props.isPlayerOne
                ? props.gameState.playerOneScore
                : props.gameState.playerTwoScore}
            </p>
          </div>
          <div style={centeredStyle}>
            <p>{props.gameState.ties}</p>
          </div>
          <div style={centeredStyle}>
            <p>
              {props.isPlayerOne
                ? props.gameState.playerTwoScore
                : props.gameState.playerOneScore}
            </p>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Stats;
