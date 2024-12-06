import express from "express";

import { verifyToken } from "../controllers/auth.js";

const authRouter = express.Router();

//Register A User
authRouter.post("/verifyToken", verifyToken);

export default authRouter;
