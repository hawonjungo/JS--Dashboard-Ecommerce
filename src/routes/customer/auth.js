const bcryptjs = require("bcryptjs");
const express = require("express");
const jwt = require("jsonwebtoken");
const {
  GenerateError,
  BadRequest,
  ServerError,
  UnauthorizedRequest,
} = require("../../helpers/errors");
const Customer = require("../../models/Customer");
const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExists = await Customer.findOne({ email });
    if (userExists) return BadRequest(res, "User already registered!");

    if (password.length < 5)
      return BadRequest(res, "Password must be atleast 5 characters long!");

    const salt = await bcryptjs.genSalt(8);
    const encryptedPassword = await bcryptjs.hash(password, salt);

    const customer = new Customer({
      ...req.body,
      password: encryptedPassword,
    });
    const response = await customer.save();
    if (!response) return ServerError(res, "Opps!Something went wrong!");

    res.send({ customer: response });
  } catch (err) {
    GenerateError(res, err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExists = await Customer.findOne({ email });
    if (!userExists) return BadRequest(res, "Login failed!");

    const isMatch = await bcryptjs.compare(password, userExists.password);
    if (!isMatch) return UnauthorizedRequest(res, "Login failed!");

    const payload = {
      _id: userExists._id,
    };

    const token = await jwt.sign(payload, "ëee");
    if (!token) return ServerError(res, "Opps!Something went wrong!");

    res.send({ user: userExists, token, userType: "customer" });
  } catch (err) {
    GenerateError(res, err);
  }
});

module.exports = router;
