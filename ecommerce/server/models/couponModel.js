import mongoose from "mongoose";

const couponSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  expiryDate: {type: Date,default: },
  minPrice: {type: Number},
});

const Coupon = mongoose.model("coupon", couponSchema);
