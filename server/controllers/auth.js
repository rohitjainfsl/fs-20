import mongoose from "mongoose";
import Users from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendVerificationEmail } from "../middlewares/verification.js";
import "dotenv/config";

export async function verifyToken(request, response) {
  const { token } = request.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // console.log(decoded)

    const user = await Users.findOneAndUpdate(
      { email: decoded.userEmail },
      { isEmailVerified: true }
    );

    if (!user) return res.status(404).send({ message: "User not found" });

    res.status(200).send({ message: "Email verified successfully" });
  } catch (error) {}
}
