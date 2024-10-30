const express = require("express");
const router = express.Router();
const productController = require("../controller/product");

router
  .post("/", productController.createProduct)
  .get("/ssr", productController.getAllProductsSSR)
  .get("/add", productController.getAddForm)
  .get("/", productController.getAllProducts)
  .get("/:id", productController.getProduct)
  .put("/:id", productController.replaceProduct)
  .patch("/:id", productController.updateProduct)
  .delete("/:id", productController.deleteProduct);

exports.router = router;
