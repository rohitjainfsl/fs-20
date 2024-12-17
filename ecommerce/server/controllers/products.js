import { product } from "../models/productModel.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";

export async function getProducts(req, res) {
  try {
    const products = await product.find({});
    if (!products)
      return res.status(400).send({ message: "No Products found" });
    res.send(products);
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

    if (mongoose.Types.ObjectId.isValid(keyword))
      productToFind = await product.findById(keyword);
    else {
      productToFind = await product.find({ uid: keyword });
    }

    if (!productToFind)
      return res
        .status(400)
        .send({ message: "No Products found with given ID" });

    res.send(productToFind);
  } catch (error) {
    res.status(500).send({ message: "Error fetching product", error });
  }
}

export async function addProduct(req, res) {
  try {
    
    const imageObj = await uploadToCloudinary(req.file); // imageObj.secureUrl
    const { name, brand, category, price, description, inStock, inventory } =
      req.body;

    const productToAdd = new product({
      name,
      brand,
      category,
      price,
      description,
      inStock,
      inventory,
      image: imageObj.secure_url,
    });

    await productToAdd.save();
    res.send({ message: "Product Added" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error adding product to DB", error });
  }
}
