import express from "express";
import {
  createCoupon,
  fetchCoupon,
  applyCoupon,
} from "../controllers/coupon.js";
import { protectRoute } from "../utils/auth.js";
import { isSeller } from "../middlewares/isSeller.js";

const couponRouter = express.Router();

couponRouter.post("/create", protectRoute, isSeller, createCoupon);
couponRouter.post("/apply", protectRoute, applyCoupon);
couponRouter.get("/", protectRoute, fetchCoupon);

export default couponRouter;
