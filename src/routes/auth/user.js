const bcryptjs = require("bcryptjs");
const config = require("config");
const express = require("express");
const jwt = require("jsonwebtoken");
const {
  BadRequest,
  ServerError,
  GenerateError,
  UnauthorizedRequest,
} = require("../../helpers/errors");
const Admin = require("../../models/Admin");
const User = require("../../models/User");
const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const userAlreadyExists = await User.findOne({
      $or: [
        {
          email,
        },
        {
          username,
        },
      ],
    });
    if (userAlreadyExists) return BadRequest(res, "User already exists!");

    const salt = await bcryptjs.genSalt(8);
    const encryptedPassword = await bcryptjs.hash(password, salt);

    const user = new User({
      username,
      email,
      password: encryptedPassword,
    });

    const response = await user.save();
    if (!response) return ServerError(res, "Opps!Something went wrong!");

    const payload = {
      _id: response._id,
    };
    const token = await jwt.sign(payload, "secret");

    res.send({ user: response, token });
  } catch (err) {
    GenerateError(res, err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (!userExists) return BadRequest(res, "Login failed!");

    const isMatch = await bcryptjs.compare(password, userExists.password);
    if (!isMatch) return BadRequest(res, "Login failed!");

    const payload = {
      _id: userExists._id,
    };
    const token = await jwt.sign(payload, "secret");
    console.log("fffffffffffffffffff");
    console.log(token);
    res.send({ user: userExists, token });
  } catch (err) {
    GenerateError(res, err);
  }
});

module.exports = router;
