import express from "express";
import {
  register,
  registerSeller,
  login,
  logout,
} from "../controllers/users.js";

const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/registerSeller", registerSeller);
userRouter.post("/login", login);
userRouter.post("/logout", logout);

export default userRouter;
