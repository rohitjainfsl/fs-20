import express from "express";

import { register, login, logout } from "../controllers/user.js";
// import { protectRoute } from "../middlewares/auth.js";

const userRouter = express.Router();

//Register A User
userRouter.post("/register", register);

// Log In User
userRouter.post("/login", login);

// Log Out User
userRouter.post("/logout", logout);

// Get User Profile (protected route)
// userRouter.get("/profile", protectRoute, profile);

export default userRouter;
