import express from "express";
import {
  register,
  registerSeller,
  login,
  logout,
  profile,
  editProfile,
} from "../controllers/users.js";
import { protectRoute } from "../utils/auth.js";

const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/registerSeller", registerSeller);
userRouter.post("/login", login);
userRouter.post("/logout", logout);
userRouter.get("/profile", protectRoute, profile);
userRouter.put("/profile", protectRoute, editProfile);

export default userRouter;
