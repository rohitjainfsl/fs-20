import express from "express";
import { register, registerSeller, login } from "../controllers/users.js";

const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/registerSeller", registerSeller);
userRouter.post("/login", login);

export default userRouter;
