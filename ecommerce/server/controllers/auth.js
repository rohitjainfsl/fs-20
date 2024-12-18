import mongoose from "mongoose";
import { User } from "../models/userModel.js";
import jwt from "jsonwebtoken";
import "dotenv/config";

export async function verifyToken(req, res) {
  const { token } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // console.log("decoded", decoded);

    const user = await User.findOneAndUpdate(
      { _id: decoded.userId },
      { isEmailVerified: true }
    );

    // console.log("user", user);

    if (!user) return res.status(404).send({ message: "User not found" });

    res.status(200).send({ message: "Email verified successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "error", error });
  }
}
