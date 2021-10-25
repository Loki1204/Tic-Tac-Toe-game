import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import { createServer } from "http";
import { Server } from "socket.io";
import socketEvents from "./controllers/socketEvents.js";

dotenv.config({ path: "./config/config.env" });

const app = express();
const httpServer = createServer(app);

export const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

app.use(express.json());

socketEvents();

const PORT = process.env.PORT || 5000;

const server = httpServer.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged Error: ${err.message}`);
  server.close(() => process.exit(1));
});
