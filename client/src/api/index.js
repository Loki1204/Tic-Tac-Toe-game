import { io } from "socket.io-client";

const socket = io("https://tic-tac-toe-game-socket-io.herokuapp.com");
// const socket = io("http://localhost:5000");

export default socket;
