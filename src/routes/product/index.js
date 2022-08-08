const express = require("express");
const router = express.Router();
const Product = require("../../models/Product");
const {
  GenerateError,
  ServerError,
  BadRequest,
} = require("../../helpers/errors");

router.post("/", async (req, res) => {
  try {
    console.log(`heeeeee####${req.body}`);
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
    res.send({ products });
  } catch (err) {
    GenerateError(res, err);
  }
});

router.delete("/delete/:_id", async (req, res) => {
  try {
    const { _id } = req.params;

    console.log(req.params, "hit!");
    const itemDeleted = await Product.findByIdAndDelete({ _id });
    if (!itemDeleted) return BadRequest(res, "Item could not be deleted!");
    res.send({ msg: "item deleted!" });
  } catch (err) {
    GenerateError(res, err);
  }
});

// router.put("/update/:id", async (req, res) => {
//   try {

//     const { _id } = req.params
//     console.log(req.params, "Update!")
//     const itemUpdated = await Product.findByIdAndUpdate({ _id: req.body.id }, {
//       item: req.body.item,
//       image: req.body.image,
//       category: req.body.category,
//       price: req.body.price,
//       supplier: req.body.supplier,
//       quantity: req.body.quantity
//     });
//     if (!itemUpdated) return BadRequest(res, "Item could not be updated!");
//     res.send({ msg: "item updated" });

//   } catch (err) {
//     GenerateError(res, err);
//   }
// });

router.put("/update/:_id", async (req, res) => {
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

module.exports = router;
