const express = require("express");
const router = express.Router();
const productController = require("../controller/product");

router
  .post("/", productController.createProduct)
  .get("/:id", productController.getProduct)
  .get("/", productController.getAllProducts)
  .put("/:id", productController.replaceProduct)
  .patch("/:id", productController.updateProduct)
  .delete("/:id", productController.deleteProduct);

exports.router = router;
