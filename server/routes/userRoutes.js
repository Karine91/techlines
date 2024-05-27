import express from "express";
import User from "../models/User.js";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { sendVerificationEmail } from "../middleware/sendVersificationEmail.js";
import { sendPasswordResetEmail } from "../middleware/sendPasswordResetEmail.js";

const userRoutes = express.Router();

const getUserData = ({
  _id,
  name,
  email,
  active,
  isAdmin,
  firstLogin,
  createdAt,
}) => ({
  _id,
  name,
  email,
  active,
  isAdmin,
  firstLogin,
  createdAt,
  token: genToken(_id),
});

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

    res.json(getUserData(user));
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

    const userData = getUserData(user);

    sendVerificationEmail(userData.token, email, name);

    res.status(201).json(userData);
  } catch (error) {
    console.log(error);
    res.status(400).send("We could not register you.");
    throw new Error(
      "Something went wrong. Please check your information and try again."
    );
  }
});

// verify email
const verifyEmail = asyncHandler(async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    const user = await User.findById(decoded.id);
    if (user) {
      user.active = true;
      await user.save();
      res.json(
        "Thanks for activating your account. You can close this window now."
      );
    } else {
      res.status(404).send("User not found.");
    }
  } catch (error) {
    res.status(401).send("Email address could not be verified.");
  }
});

// password reset request
const passwordResetRequest = asyncHandler(async (req, res) => {
  const { email } = req.body;
  try {
    const user = User.findOne({ email });
    if (user) {
      const newToken = genToken(user._id);
      sendPasswordResetEmail(newToken, user.email, user.name);
      res.status(200).send(`We have send you a recover email to ${email}`);
    }
  } catch (error) {
    res.status(401).send("There is no account with such an email address.");
  }
});

// password reset
const passwordReset = asyncHandler(async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    const user = await User.findById(decoded.id);
    if (user) {
      user.password = req.body.password;
      await user.save();
      res.json("Your password has been updated successfully.");
    } else {
      res.status(404).send("User not found.");
    }
  } catch (error) {
    res.status(401).send("Password reset failed.");
  }
});

// google login
const googleLogin = asyncHandler(async (req, res) => {
  const { googleId, email, name, googleImage } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user && user.googleId) {
      user.firstLogin = false;
      await user.save();
      res.json({
        ...getUserData(user),
        googleImage: user.googleImage,
        googleId: user.googleId,
      });
    } else if (user) {
      res.status(400).send("You already have account with this email.");
    } else {
      const newUser = await User.create({
        name,
        email,
        googleId,
        googleImage,
      });

      const userData = getUserData(newUser);

      sendVerificationEmail(userData.token, email, name);

      res.status(201).json({
        ...userData,
        googleImage: newUser.googleImage,
        googleId: newUser.googleId,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(404).send("Something went wrong, please try again later.");
  }
});

userRoutes.route("/login").post(loginUser);
userRoutes.route("/register").post(registerUser);
userRoutes.route("/verify-email").get(verifyEmail);
userRoutes.route("/password-reset-request").post(passwordResetRequest);
userRoutes.route("/password-reset").post(passwordReset);
userRoutes.route("/google-login").post(googleLogin);

export default userRoutes;
