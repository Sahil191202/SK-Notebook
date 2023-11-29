const connectToMongo = require("./db");
const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

const port = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || "development";

// MongoDB Connection
connectToMongo();

// Middleware
app.use(cors());
app.use(express.json());

// API routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));
app.use("/api/posts", require("./routes/posts"));
app.use("/api/conversations", require("./routes/conversations"));
app.use("/api/messages", require("./routes/messages"));

// Serve static assets in production
const __dirname1 = path.resolve();
if (NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is Running");
  });
}

// Socket.IO connections
let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = async (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  console.log("a user connected.");

  // take userId and socketId from user
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);
    io.emit("getMessage", {
      senderId,
      text,
    });
  });

  // when disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});

// Start the server
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
