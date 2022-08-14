const express = require("express");
const {
  GenerateError,
  ServerError,
  BadRequest,
} = require("../../helpers/errors");
const Order = require("../../models/Order");
const router = express.Router();

router.post("/create", async (req, res) => {
  try {
    const { name, contact, address, basket, status, totalPrice } = req.body;

    console.log(req.body);

    const order = new Order({
      name,
      contact,
      address,
      basket,
      status,
      totalPrice,
    });
    const response = await order.save();
    if (!response) return ServerError(res, "Opps!Something went wrong!");

    res.send({ order });
  } catch (err) {
    GenerateError(res, err);
  }
});

router.get("/", async (req, res) => {
  try {
    const orders = await Order.find({}).sort({
      createdAt: "-1",
    });
    res.send({ orders });
  } catch (err) {
    GenerateError(res, err);
  }
});

router.put("/", async (req, res) => {
  try {
    const { _id, status } = req.body;
    console.log(_id);
    console.log(req.body, "---");
    const orderExist = await Order.findById(_id);
    if (!orderExist) return BadRequest(res, "Order not found!");

    const response = await Order.findByIdAndUpdate(
      _id,
      {
        status,
      },
      {
        new: true,
      }
    );
    res.send({ response });
  } catch (err) {
    GenerateError(res, err);
  }
});

router.get("/getOrder/:_order", async (req, res) => {
  try {
    const { _order } = req.params;

    const order = await Order.findById(_order).populate({
      model: "product",
      path: "basket._id",
    });
    if (!order) return BadRequest(res, "Order does not exist!");

    res.send({ order });
  } catch (err) {
    GenerateError(res, err);
  }
});

router.delete("/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    console.log(_id);
    const orderExists = await Order.findById(_id);
    if (!orderExists) return BadRequest(res, "No Order to delete!");

    const response = await Order.findByIdAndRemove(_id);
    if (!response) return ServerError(res, "Opps!Something went wrong!");

    res.send({ msg: "Order deleted!" });
  } catch (err) {
    GenerateError(res, err);
  }
});

module.exports = router;
