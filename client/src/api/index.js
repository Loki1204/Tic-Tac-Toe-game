import { io } from "socket.io-client";

const socket = io("https://tic-tac-toe-game-socket-io.herokuapp.com/");

export default socket;
