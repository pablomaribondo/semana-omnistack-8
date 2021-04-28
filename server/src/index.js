const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const routes = require("./routes");

const PORT = process.env.PORT || 3333;
const server = express();

const MONGO_ATLAS_URI = process.env.MONGO_ATLAS_URI;
mongoose.connect(MONGO_ATLAS_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

server.use(cors());
server.use(express.json());
server.use(routes);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
