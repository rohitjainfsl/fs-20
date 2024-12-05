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
  const idToFetch = request.params.id;
  try {
    if (!idToFetch)
      return response
        .status(400)
        .send({ message: "You must specify a book ID" });

    if (!mongoose.Types.ObjectId.isValid(idToFetch))
      return response
        .status(400)
        .send({ message: "Given ID is not in proper format" });

    const book = await Books.findById(idToFetch);
    console.log("book", book);
    if (!book)
      return response
        .status(404)
        .send({ message: "No book found with the given ID" });

    return response.send(book);
  } catch (error) {
    return response
      .status(500)
      .send({ message: "Error fetching book ", error });
  }
}

// http://localhost:5173/verify-email?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRW1haWwiOiJyb2hpdGphaW50cmFpbmVyQGdtYWlsLmNvbSIsImlhdCI6MTczMzQxNTQyMiwiZXhwIjoxNzMzNDE5MDIyfQ.Trw6aXTkzN7ak085bn4Janu5H9mkPQzHFgNVIKpAyKM
