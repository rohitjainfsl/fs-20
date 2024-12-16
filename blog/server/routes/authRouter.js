import express from "express";
import { protectRoute } from "../middlewares/auth.js";

const authRouter = express.Router();

authRouter.get("/check", protectRoute, (req, res) => {
  res.status(200).send({ user: req.user, isAuthenticated: true });
});

export default authRouter;
