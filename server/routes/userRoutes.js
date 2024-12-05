import express from "express";

import { register, login } from "../controllers/users.js";
import { verify } from "jsonwebtoken";

const userRouter = express.Router();

//Register A User
userRouter.post("/register", register);

// Log In User
userRouter.post("/login", login);

//Verifying Email Token
userRouter.post("/verify-token", verifyToken);

export default userRouter;
