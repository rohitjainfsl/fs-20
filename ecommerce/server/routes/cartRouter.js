import express from "express";
import { protectRoute } from "../utils/auth.js";
import {
  addToCart,
  removeFromCart,
  getCart,
  updateQuantity,
} from "../controllers/cart.js";

const cartRouter = express.Router();

cartRouter.post("/add", protectRoute, addToCart);
cartRouter.delete("/remove/:productId", protectRoute, removeFromCart);
cartRouter.get("/", protectRoute, getCart);
cartRouter.put("/quantity", protectRoute, updateQuantity);

export default cartRouter;
