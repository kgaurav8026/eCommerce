const model = require("../model/product");
const Product = model.Product;
const ejs = require("ejs");
const path = require("path");

// view
exports.getAddForm = async (req, res) => {
  ejs.renderFile(
    path.resolve(__dirname, "../pages/add.ejs"),
    function (err, str) {
      if (err) {
        console.log(err);
      } else {
        res.send(str);
      }
    }
  );
};

exports.getAllProductsSSR = async (req, res) => {
  const products = await Product.find();
  ejs.renderFile(
    path.resolve(__dirname, "../pages/index.ejs"),
    { products: products },
    function (err, str) {
      if (err) {
        console.log(err);
      } else {
        res.send(str);
      }
    }
  );
};

exports.getAllProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

exports.getProduct = async (req, res) => {
  const id = req.params.id;
  const product = await Product.findById(id);
  res.json(product);
};

exports.createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    const doc = await product.save();
    console.log({ doc });
    res.status(201).json({ type: "POST", product: doc });
  } catch (err) {
    console.error({ err });
    res.status(400).json(err);
  }
};

exports.replaceProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const doc = await Product.findOneAndReplace({ _id: id }, req.body, {
      new: true,
    });
    res.status(200).json(doc);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

exports.updateProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const doc = await Product.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    res.status(201).json(doc);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};
exports.deleteProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const doc = await Product.findOneAndDelete({ _id: id }, { new: true });
    res.status(201).json(doc);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};
