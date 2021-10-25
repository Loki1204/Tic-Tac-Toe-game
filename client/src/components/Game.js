import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import socket from "../api";
import Announcement from "./Announcement";
import Board from "./Board";
import Stats from "./Stats";

const Game = (props) => {
  const [state, setState] = useState({
    announcement: false,
    message: "",
    opponent_disconnected: false,
  });

  useEffect(() => {
    socket.on("announcement", (text) => {
      switch (text) {
        case "playerOne":
          props.isPlayerOne
            ? setState((prevState) => {
                return {
                  ...prevState,
                  announcement: true,
                  message: "You won!",
                };
              })
            : setState((prevState) => {
                return {
                  ...prevState,
                  announcement: true,
                  message: "You lost",
                };
              });
          break;

        case "playerTwo":
          props.isPlayerOne
            ? setState((prevState) => {
                return {
                  ...prevState,
                  announcement: true,
                  message: "You lost",
                };
              })
            : setState((prevState) => {
                return {
                  ...prevState,
                  announcement: true,
                  message: "You Won!",
                };
              });
          break;

        case "tie":
          setState((prevState) => {
            return {
              ...prevState,
              announcement: true,
              message: "It's a Tie",
            };
          });
          break;

        default:
          console.log("no switch cases");
      }

      setTimeout(() => {
        setState({ announcement: false });
      }, 1250);
    });

    socket.on("User_disconnected", () => {
      setState((prevState) => {
        return {
          ...prevState,
          opponent_disconnected: true,
        };
      });
    });
  }, [props.isPlayerOne]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      {state.opponent_disconnected && (
        <AnimatePresence>
          <motion.div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              position: "absolute",
              left: "0%",
              top: "0%",
              width: "100%",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <h6>Opponent disconnected. Please reload to play new game.</h6>
          </motion.div>
        </AnimatePresence>
      )}
      {!state.opponent_disconnected && (
        <div className="game">
          <div className="board-container">
            <Board
              gameState={props.gameState}
              isPlayerOne={props.isPlayerOne}
            />
          </div>
          <div className="stats-container">
            {state.announcement && <Announcement>{state.message}</Announcement>}
            {!state.announcement && (
              <Stats
                gameState={props.gameState}
                isPlayerOne={props.isPlayerOne}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Game;
