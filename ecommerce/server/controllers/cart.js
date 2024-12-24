import { Cart } from "../models/cartModel.js";
import { Product } from "../models/productModel.js";

export async function addToCart(req, res) {
  try {
    const { productId, quantity = 1 } = req.body;
    const userId = req.user._id;

    // Find or create cart
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    // Check if product already exists in cart
    const existingItem = cart.items.find(
      (item) => item.product.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity: quantity });
    }

    // Calculate total amount
    cart.totalAmount = await calculateTotalAmount(cart.items);

    //Save it
    await cart.save();

    // Populate product details before sending response
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error adding to cart" });
  }
}

async function calculateTotalAmount(items) {
  let total = 0;
  for (const item of items) {
    //Find the product
    const productToAdd = await Product.findOne(item.product);
    total += productToAdd.price * item.quantity;
  }
  return total;
}

export async function removeFromCart(req, res) {}
export async function getCart(req, res) {}
export async function updateQuantity(req, res) {}
