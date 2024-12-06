import mongoose from "mongoose";
import Users from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendVerificationEmail } from "../middlewares/verification.js";

export async function register(request, response) {
  const { name, username, email, phone } = request.body;
  try {
    //check if username exists
    const existingUsername = await Users.findOne({ username });

    if (existingUsername)
      return response
        .status(400)
        .send({ message: `Username ${username} exists` });

    //check if email exists
    const existingEmail = await Users.findOne({ email });

    if (existingEmail)
      return response.status(400).send({ message: `Email ${username} exists` });

    //encryption: converting plain text password into a jumbled up hash
    const password = await bcrypt.hash(request.body.password, 10);

    const newUser = new Users({
      name,
      username,
      email,
      phone,
      password,
    });

    await newUser.save();

    //Send Email
    //nodemailer sendgrid
    //JWT JSON Web Token

    await sendVerificationEmail(email);

    //store token in DB

    return response.status(201).send({ message: "User registered" });
  } catch (error) {
    response
      .status(500)
      .send({ message: "Error registering user", error: error.message });
  }
}

export async function verifyToken(request, response) {
  //verify the token
  //decode the token to fetch email
  //toggle isEmailVerified field of user with fetched email
}

export async function login(request, response) {
  const { username, password } = request.body;
  try {
    //see if user exists
    const user = await Users.findOne({ username });

    if (!user)
      return response.status(401).send({ message: "Incorrect credentials" });

    //see if emailisVerified

    if (!user.isEmailVerified)
      return response
        .status(403)
        .send({ message: "Please verify your email before logging in" });

    //see if passwords match

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch)
      return response.status(401).send({ message: "Incorrect credentials" });
  } catch (error) {
    return response.status(500).send({ message: error });
  }
}
