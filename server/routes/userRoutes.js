import express from "express";

import { register, login } from "../controllers/users.js";

const userRouter = express.Router();

//Register A User
userRouter.post("/register", register);

// Log In User
userRouter.post("/login", login);

export default userRouter;
