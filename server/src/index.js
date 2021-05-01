const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const routes = require("./routes");

const PORT = process.env.PORT || 3333;
const app = express();

const server = require("http").Server(app);
const io = require("socket.io")(server, {
  cookie: false,
});

const connectedUsers = {};

io.on("connection", socket => {
  const { user } = socket.handshake.query;

  connectedUsers[user] = socket.id;
});

const MONGO_ATLAS_URI = process.env.MONGO_ATLAS_URI;
mongoose.connect(MONGO_ATLAS_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.use((request, _response, next) => {
  request.io = io;
  request.connectedUsers = connectedUsers;

  return next();
});
app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
