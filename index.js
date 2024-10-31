require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const server = express();
const path = require("path");
const productRouter = require("./routes/product");
const usersRouter = require("./routes/user");
const authRouter = require("./routes/auth");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const fs = require("fs");
const publicKey = fs.readFileSync(
  path.resolve(__dirname, "./public.key"),
  "utf-8"
);
// console.log("DB_PASSWORD :", process.env.DB_PASSWORD);

// body parser
const auth = (req, res, next) => {
  try {
    const token = req.get("Authorization").split("Bearer ")[1];
    var decoded = jwt.verify(token, publicKey);
    console.log(decoded);
    if (decoded.email) {
      next();
    } else {
      res.sendStatus(401);
    }
  } catch (err) {
    res.sendStatus(401);
  }
};
server.use(cors());
server.use(express.json());
server.use(express.urlencoded());
server.use(morgan("combined"));
server.use(express.static(path.resolve(__dirname, process.env.PUBLIC_DIR)));
server.use("/auth", authRouter.router);
server.use("/products", auth, productRouter.router);
server.use("/users", auth, usersRouter.router);
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
