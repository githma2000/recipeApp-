const express = require("express");
const UserModel = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  try {
    const user = await UserModel.findOne({ username });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({ username, password: hashedPassword });
    await newUser.save();

    return res.status(201).json({ message: "Record saved" });
  } catch (error) {
    console.error("Error during registration:", error); // Log the error
    return res.status(500).json({ message: "Internal Server Error", error });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await UserModel.findOne({ username });
  if (!user) {
    return res.json({ message: "wrong credentials" });
  }
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.json({ message: "wrong credentials" });
  }

  const token = jwt.sign({ id: user_id }, "secret");
  res.cookie("token", token);
  return res.json({ message: "Successfully Login", id: user._id });
});

module.exports = router;
