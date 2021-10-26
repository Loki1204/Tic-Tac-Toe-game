import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import socketEvents from "./controllers/socketEvents.js";

dotenv.config({ path: "./config/config.env" });

const app = express();

app.use(express.json());
app.use(cors());

const httpServer = createServer(app);

export const io = new Server(httpServer, {
  cors: {
    origin: "https://tic-tac-toe-game-socket-io.netlify.app",
    methods: ["GET", "POST", "PUT"],
  },
});

socketEvents();

app.get("/", (req, res) => {
  res.send("Welcome to Tic-Tac-Toe game API");
});

const PORT = process.env.PORT;

httpServer.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
