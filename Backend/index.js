const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const socketIO = require("socket.io");
const cors = require("cors");

const io = socketIO(server, {
  cors: {
    origin: "https://chat-app-q9ca.vercel.app/",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (client) => {
  client.on("send_message", (data) => {
    io.sockets.emit("receive_message", data);
  });
});

server.listen(8000, () => {
  console.log("Server started");
});
