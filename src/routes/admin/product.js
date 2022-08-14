const express = require("express");
const {
  GenerateError,
  ServerError,
  BadRequest,
} = require("../../helpers/errors");
const Product = require("../../models/Product");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { desc, img, price, category, quantity } = req.body;

    const product = new Product({
      ...req.body,
    });

    const response = await product.save();
    if (!response) return ServerError(res, "Opps!Something went wrong!");

    res.send({ product });
  } catch (err) {
    GenerateError(res, err);
  }
});

router.get("/", async (req, res) => {
  try {
    const products = await Product.find({});
    console.log(products);
    res.send({ products });
  } catch (err) {
    GenerateError(res, err);
  }
});

router.delete("/:_id", async (req, res) => {
  try {
    const { _id } = req.params;

    const productExists = await Product.findById(_id);
    if (!productExists) return BadRequest(res, "No product to delete!");

    const response = await Product.findByIdAndRemove(_id);
    if (!response) return ServerError(res, "Opps!Something went wrong!");

    res.send({ msg: "Product deleted!" });
  } catch (err) {
    GenerateError(res, err);
  }
});

router.put("/:_id", async (req, res) => {
  // console.log(req.params);
  // console.log(req.body);
  try {
    const { _id } = req.body;
    const response = await Product.findByIdAndUpdate(_id, {
      ...req.body,
    });
    console.log("response  ddd" + response);
    res.send({ product: response });
  } catch (err) {
    GenerateError(res, err);
  }
});

router.put("/quantity/:_id", async (req, res) => {
  // console.log(req.params);
  // console.log(req.body);
  try {
    const { _id } = req.params;
    const productExist = await Product.findById(_id);
    productExist.quantity = productExist.quantity - 1;
    console.log(productExist + "ddd");
    const response = await Product.findByIdAndUpdate(_id, {
      ...productExist,
    });

    res.send({ product: response });
  } catch (err) {
    GenerateError(res, err);
  }
});

module.exports = router;
