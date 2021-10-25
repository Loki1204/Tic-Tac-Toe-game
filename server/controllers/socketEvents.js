import { io } from "../server.js";
import GameSession from "./gameController.js";

const socketEvents = () => {
  let gameSessionObj = {};
  let details = "details";

  io.on("connection", (socket) => {
    // Creating a game session by playerOne
    socket.on("create_session", (playerName) => {
      let joiningCode = Math.floor(Math.random() * 1000000).toString();

      const gameSession = new GameSession(playerName, socket, joiningCode);

      gameSessionObj = { ...gameSessionObj, [details]: gameSession };

      socket.emit("session_created", playerName, joiningCode);

      socket.on("disconnect", () => {
        try {
          gameSessionObj[details].playerTwoSocket.emit("User_disconnected");
        } catch (error) {
          console.log(error);
        }

        delete gameSessionObj[details];
      });
    });

    // Joining a game session by playerTwo
    socket.on("join_session", (joiningCode, playerName) => {
      if (gameSessionObj[details].joiningCode !== joiningCode) {
        socket.emit("invalid_joiningCode");
      } else {
        gameSessionObj[details].JoinSession(playerName, socket);

        gameSessionObj[details].BroadCast(
          "valid_joiningCode",
          gameSessionObj[details].gameState
        );

        socket.on("disconnect", () => {
          try {
            gameSessionObj[details].playerOneSocket.emit("User_disconnected");
          } catch (error) {
            console.log(error);
          }

          delete gameSessionObj[details];
        });
      }
    });

    // GamePlay logic
    socket.on("player_move", (index, value) => {
      gameSessionObj[details].PlayerMove(index, value);

      switch (gameSessionObj[details].GamePlay()) {
        case "playerOne":
          gameSessionObj[details].BroadCast("announcement", "playerOne");
          break;
        case "playerTwo":
          gameSessionObj[details].BroadCast("announcement", "playerTwo");
          break;
        case "tie":
          gameSessionObj[details].BroadCast("announcement", "tie");
          break;
        case "ongoing":
          break;
        default:
          console.log("no switch cases hit");
      }

      // Checking winners before broadcasting
      gameSessionObj[details].BroadCast(
        "update",
        gameSessionObj[details].gameState
      );
    });
  });
};

export default socketEvents;
