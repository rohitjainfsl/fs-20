import mongoose from "mongoose";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendVerificationEmail } from "../middlewares/verification.js";

export async function register(req, res) {
  const { name, username, email, phone, gender } = req.body;
  //   console.log(req.body);
  try {
    //check if username exists
    const existingUsername = await User.findOne({ username });

    if (existingUsername)
      return res.status(400).send({ message: `Username ${username} exists` });

    //check if email exists
    const existingEmail = await User.findOne({ email });

    if (existingEmail)
      return res.status(400).send({ message: `Email ${username} exists` });

    //encryption: converting plain text password into a jumbled up hash
    const password = await bcrypt.hash(req.body.password, 10);

    const newUser = new User({
      name,
      username,
      email,
      phone,
      password,
      gender,
    });

    await newUser.save();

    //Send Email
    await sendVerificationEmail(newUser._id, newUser.email);

    return res.status(201).send({ message: "User registered" });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error registering user", error: error.message });
  }
}

export async function login(req, res) {
  const { username, password } = req.body;
  try {
    // AUTHENTICATION
    //see if user exists
    const user = await User.findOne({ username });

    if (!user)
      return res.status(401).send({ message: "Incorrect credentials" });

    //see if emailisVerified

    if (!user.isEmailVerified)
      return res
        .status(403)
        .send({ message: "Please verify your email before logging in" });

    //see if passwords match

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch)
      return res.status(401).send({ message: "Incorrect credentials" });

    //AUTHORISATION
    // SESSION VARIABLE = TOKEN

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: user._id,
        username: user.username,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );

    //Send it to frontend:
    //1. send it with res return res.status(200).send({token: token})
    //2. send the token as an HTTP cookie

    // Set cookie with JWT token
    res.cookie("token", token, {
      httpOnly: true, //no other JS script will be able to see this on frontend
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    const loggedInUser = {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      gender: user.gender,
    };

    // res.send(user).select(-password);
    res.send(loggedInUser);
  } catch (error) {
    return res.status(500).send({ message: error });
  }
}

// export const profile = async (req, res) => {
//   try {
//     const user = await User.findById(req.user._id).select("-password");

//     if (!user) {
//       return res.status(404).send({ message: "User not found" });
//     }

//     res.status(200).json({
//       _id: user._id,
//       email: user.email,
//       username: user.username,
//       name: user.name,
//       phone: user.phone,
//       gender: user.gender,
//       createdAt: user.createdAt,
//     });
//   } catch (error) {
//     console.error("Profile fetch error:", error);
//     res.status(500).send({ message: "Server error while fetching profile" });
//   }
// };
