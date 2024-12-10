import express from "express";

import { register, login } from "../controllers/user.js";
// import { protectRoute } from "../middlewares/auth.js";

const userRouter = express.Router();

//Register A User
userRouter.post("/register", register);

// Log In User
userRouter.post("/login", login);

// Get User Profile (protected route)
// userRouter.get("/profile", protectRoute, profile);

export default userRouter;
