const express = require("express");
const router = express.Router();
const userController = require("../controller/user");

router
  .post("/", userController.createUser)
  .get("/:id", userController.getUsers)
  .get("/", userController.getAllUsers)
  .put("/:id", userController.updateUser)
  .patch("/:id", userController.replaceUser)
  .delete("/:id", userController.deleteUser);

exports.router = router;
