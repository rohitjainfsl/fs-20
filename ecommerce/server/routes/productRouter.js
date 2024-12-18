import express from "express";
import upload from "../middlewares/multer.js";
import {
  getProducts,
  getProduct,
  addProduct,
} from "../controllers/products.js";
import { protectRoute } from "../utils/auth.js";

const productRouter = express.Router();

productRouter.get("/get", getProducts);
productRouter.get("/get/:id", getProduct);

productRouter.post("/add", protectRoute, upload.single("image"), addProduct);

export default productRouter;
