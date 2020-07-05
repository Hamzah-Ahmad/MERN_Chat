const express = require("express");
const http = require("http");
const cors = require("cors");
const socketio = require("socket.io");
const mongoose = require("mongoose");
//Initializing variables
const app = express();
app.use(cors());

const server = http.createServer(app);
const io = socketio(server);
// const authMiddleware = require("./middleware/auth-middleware");

const PORT = process.env.PORT || 5000;

//Connecting to DB
mongoose.connect(
  "mongodb+srv://Hamzah:Haz1996@cluster0-20vtk.mongodb.net/mern_chat?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("Connected to DB")
);

//Using CORS middleware
app.use(cors());
//Using express JSON parse middleware
app.use(express.json());

//Setting up web sockets
io.on("connection", (socket) => {
  socket.on("joinRoom", ({ user, room }) => {
    socket.join(room);
    socket.username = user.name; //We gave the sockets a username property so that we could use it to identify which user just disconnected
    socket.room = room;
    socket.broadcast
      .to(socket.room)
      .emit("welcomeUser", `${user.name} has joined the room`);
  });
  socket.on("leaveRoom", (room) => {
    socket.broadcast
      .to(socket.room)
      .emit("welcomeUser", `${socket.username} has left the room`);
    socket.leave(socket.room);
  });
  socket.on("message", (message) => {
    io.to(message.room).emit("message", message);
  });
  socket.on("disconnect", () => console.log(`${socket.username} disconnected`));
});

//Importing route files
const authRoutes = require("./routes/authRoutes");

//Routes middleware
app.use("/auth", authRoutes);

app.use((error, req, res, next) => {
  res.status(400);
  res
    .status(error.code || 500)
    .json({ msg: error.message || "An error has occured" });
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
