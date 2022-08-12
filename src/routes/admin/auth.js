const bcryptjs = require("bcryptjs");
const express = require("express");
const jwt = require("jsonwebtoken");
const {
  GenerateError,
  BadRequest,
  ServerError,
  UnauthorizedRequest,
} = require("../../helpers/errors");
const Admin = require("../../models/Admin");
const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExists = await Admin.findOne({ email });
    if (userExists) return BadRequest(res, "User already registered!");
    console.log("####3" + userExists);
    if (password.length < 5)
      return BadRequest(res, "Password must be atleast 5 characters long!");

    const salt = await bcryptjs.genSalt(8);
    const encryptedPassword = await bcryptjs.hash(password, salt);

    const admin = new Admin({
      email,
      password: encryptedPassword,
    });
    const response = await admin.save();
    if (!response) return ServerError(res, "Opps!Something went wrong!");

    res.send({ admin: response });
  } catch (err) {
    GenerateError(res, err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExists = await Admin.findOne({ email });
    if (!userExists) return BadRequest(res, "Login failed!");

    const isMatch = await bcryptjs.compare(password, userExists.password);
    if (!isMatch) return UnauthorizedRequest(res, "Login failed!");

    const payload = {
      _id: userExists._id,
    };

    const token = await jwt.sign(payload, "232232232323");
    if (!token) return ServerError(res, "Opps!Something went wrong!");

    res.send({ user: userExists, token, userType: "admin" });
  } catch (err) {
    GenerateError(res, err);
  }
});

module.exports = router;
