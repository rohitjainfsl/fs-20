import express from "express";
import { createOrder } from "../controllers/orders.js";
import { protectRoute } from "../utils/auth.js";

const orderRouter = express.Router();

orderRouter.post("/create", protectRoute, createOrder);

export default orderRouter;
