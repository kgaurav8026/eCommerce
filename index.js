require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const server = express();
const path = require("path");
const productRouter = require("./routes/product");
const cors = require("cors");
// console.log("DB_PASSWORD :", process.env.DB_PASSWORD);

// body parser
server.use(cors());
server.use(express.json());
server.use(morgan("combined"));
server.use(express.static(path.resolve(__dirname, process.env.PUBLIC_DIR)));
server.use("/products", productRouter.router);
server.use("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "dist", "index.html"));
});

server.listen(process.env.PORT, () => {
  console.log("Server Started");
});

// db--connection
const mongoose = require("mongoose");

// Database connection
async function main() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected successfully to MongoDB");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
}

main();
