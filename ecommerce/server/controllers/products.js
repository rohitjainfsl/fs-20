import { Product } from "../models/productModel.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";
import mongoose from "mongoose";

export async function getProducts(req, res) {
  try {
    let query = {};

    if (req.query.name) {
      query.name = { $regex: new RegExp(req.query.name, "i") };
    }
    if (req.query.category) {
      query.category = { $regex: new RegExp(req.query.category, "i") };
    }
    if (req.query.brand) {
      query.brand = { $regex: new RegExp(req.query.brand, "i") };
    }
    if (req.query.minPrice && req.query.maxPrice) {
      query.price = {
        $gte: req.query.minPrice,
        $lte: req.query.maxPrice,
      };
    }

    const page = req.query.page ? parseInt(req.query.page) : 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const products = await Product.find(query).skip(skip).limit(limit);

    const totalCount = await Product.countDocuments(query);

    if (!products)
      return res.status(400).send({ message: "No Products found" });

    res.send({
      products,
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit),
    });
  } catch (error) {
    res.status(500).send({ message: "Error fetching products", error });
  }
}

export async function getProduct(req, res) {
  const keyword = req.params.id;
  let productToFind;
  try {
    if (!keyword)
      return res
        .status(400)
        .send({ message: "Provide an ID to find a product" });

    if (mongoose.Types.ObjectId.isValid(keyword)) {
      productToFind = await Product.findById(keyword);
    } else {
      productToFind = await Product.find({ uid: keyword });
    }
    // console.log("productToFind", productToFind);

    if (!productToFind)
      return res
        .status(400)
        .send({ message: "No Products found with given ID" });

    res.send(productToFind);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error fetching product", error: error.message });
  }
}

export async function addProduct(req, res) {
  try {
    // console.log(req.file);
    const imageObj = await uploadToCloudinary(req.file); // imageObj.secureUrl
    const { name, brand, category, price, description, inStock, inventory } =
      req.body;

    const attributesArray = JSON.parse(req.body.attributes);

    const productToAdd = new Product({
      name,
      brand,
      category,
      price,
      description,
      inStock,
      inventory,
      image: imageObj.secure_url,
      addedBy: req.user._id,
      attributes: attributesArray,
    });

    await productToAdd.save();
    res.send({ message: "Product Added" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error adding product to DB", error });
  }
}
