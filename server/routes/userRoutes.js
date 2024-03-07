import express from "express";
import User from "../models/User.js";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { sendVerificationEmail } from "../middleware/sendVersificationEmail.js";

const userRoutes = express.Router();

// TODO: redefine expiresIn
const genToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, { expiresIn: "60d" });
};

// login
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPasswords(password))) {
    user.firstLogin = false;
    await user.save();
    res.json({
      ...user.toObject(),
      token: genToken(user._id),
    });
  } else {
    res.status(401).send("Invalid email or password.");
    throw new Error("User not found.");
  }
});
// register
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res
      .status(400)
      .send("We already have an account with that email address.");
  }

  try {
    const user = await User.create({
      name,
      email,
      password,
    });

    const newToken = genToken(user._id);

    sendVerificationEmail(newToken, email, name, user._id);

    res.status(201).json({ ...user.toObject(), token: newToken });
  } catch (error) {
    console.log(error);
    res.status(400).send("We could not register you.");
    throw new Error(
      "Something went wrong. Please check your information and try again."
    );
  }
});

// verify email

// password reset request

// password reset

userRoutes.route("/login").post(loginUser);
userRoutes.route("/register").post(registerUser);

export default userRoutes;
