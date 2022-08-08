const express = require("express");
const bcryptjs = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const {
  ServerError,
  BadRequest,
  GenerateError,
} = require("../../helpers/errors");
const Admin = require("../../models/Admin");
const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const userAlreadyExists = await Admin.findOne({
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

    const admin = new Admin({
      ...req.body,
      password: encryptedPassword,
    });

    const response = await admin.save();
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

    const userExists = await Admin.findOne({ email });
    console.log("@@@@@@@@@@@@@@@");
    console.log(userExists);
    if (!userExists) return BadRequest(res, "Login failed!");

    const isMatch = await bcryptjs.compare(password, userExists.password);
    if (!isMatch) return BadRequest(res, "Login failed!");

    const payload = {
      _id: userExists._id,
    };
    const token = await jwt.sign(payload, "test");

    res.send({ user: userExists, token });
  } catch (err) {
    GenerateError(res, err);
  }
});

module.exports = router;
