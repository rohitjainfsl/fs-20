import express from "express";
import { verifyToken } from "../controllers/auth.js";
import { protectRoute } from "../utils/auth.js";

const authRouter = express.Router();

authRouter.post("/verifyToken", verifyToken);

authRouter.get("/validate-token", protectRoute, (req, res) => {
  res.status(200).json({ user: req.user });
});

// authRouter.get("/check", protectRoute, (req, res) => {
//   res.status(200).send({ user: req.user, isAuthenticated: true });
// });

export default authRouter;
