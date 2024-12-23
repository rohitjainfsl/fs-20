import mongoose from "mongoose";
import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendVerificationEmail } from "../utils/verification.js";

export async function register(req, res) {
  const { name, username, email, phone } = req.body;
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

export async function registerSeller(req, res) {
  const { name, username, email, phone } = req.body;
  try {
    //check if username exists
    const existingUsername = await User.findOne({ username });

    if (existingUsername)
      return res.status(400).send({ message: `Username ${username} exists` });

    //check if email exists
    const existingEmail = await User.findOne({ email });

    if (existingEmail.role === "seller")
      return res.status(400).send({ message: `You are already a seller` });

    if (existingEmail) {
      //change the role to seller
      await User.findOneAndUpdate({ email: email }, { role: "seller" });

      return res
        .status(200)
        .send({ message: `Your status is now elevated to a seller` });
    } else {
      //encryption: converting plain text password into a jumbled up hash
      const password = await bcrypt.hash(req.body.password, 10);

      const newUser = new User({
        name,
        username,
        email,
        phone,
        password,
        role: "seller",
      });

      await newUser.save();

      //Send Email
      await sendVerificationEmail(newUser._id, newUser.email);

      return res.status(201).send({ message: "Seller registered" });
    }
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

    // Set cookie with JWT token
    res.cookie("token", token, {
      httpOnly: true,
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
      username: user.username,
    };

    console.log(loggedInUser);

    // res.send(user).select(-password);
    res.send(loggedInUser);
  } catch (error) {
    return res.status(500).send({ message: error });
  }
}

export function logout(req, res) {
  res.clearCookie("token");
  res.status(200).send({ message: "Logged out successfully" });
}

export const profile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    res.status(200).json({
      _id: user._id,
      email: user.email,
      username: user.username,
      name: user.name,
      phone: user.phone,
      gender: user.gender,
      createdAt: user.createdAt,
      role: user.role,
    });
  } catch (error) {
    console.error("Profile fetch error:", error);
    res.status(500).send({ message: "Server error while fetching profile" });
  }
};

export const editProfile = async (req, res) => {
  const { name, email, role, phone, username } = req.body;

  try {
    await User.findByIdAndUpdate(req.user._id, {
      name,
      email,
      role,
      phone,
      username,
    });

    res.status(200).send({ message: "Product Updated" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Error updating product", error });
  }
};

//WISHLIST
export async function addToWishlist(req, res) {
  try {
    const { productId } = req.body;
    const userId = req.user._id;

    // Check if product exists in wishlist
    const user = await User.findById(userId);
    if (user.wishlist.includes(productId)) {
      return res.status(400).json({ message: "Product already in wishlist" });
    }

    //Add the product to wishlist
    await User.findByIdAndUpdate(userId, {
      $push: { wishlist: productId },
    });
    res.status(200).json({ message: "Added to wishlist successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding to wishlist" });
  }
}

export async function removeFromWishlist(req, res) {}
