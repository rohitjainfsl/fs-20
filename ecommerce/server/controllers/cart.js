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
    await cart.populate("items.product");

    res.status(200).send({ cart });
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

export async function removeFromCart(req, res) {
  try {
    const { productId } = req.params;
    const userId = req.user._id;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).send({ message: "Cart not found" });

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );

    cart.totalAmount = await calculateTotalAmount(cart.items);

    await cart.save();

    await cart.populate("items.product");

    res.status(200).send({ cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error removing from cart" });
  }
}

export async function getCart(req, res) {
  try {
    const userId = req.user._id;
    const cart = await Cart.findOne({ user: userId }).populate("items.product");
    if (!cart) {
      return res.status(200).send({ cart: { items: [], totalAmount: 0 } });
    }
    return res.status(200).send({ cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching cart" });
  }
}
export async function updateQuantity(req, res) {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user._id;

    console.log(productId, quantity, userId);

    if (quantity < 1)
      return res.status(400).json({ message: "Quantity must be at least 1" });

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const cartItem = cart.items.find(
      (item) => item.product.toString() === productId
    );

    if (!cartItem) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    cartItem.quantity = quantity;

    cart.totalAmount = await calculateTotalAmount(cart.items);

    await cart.save();

    await cart.populate("items.product");

    res.status(200).json({ cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating quantity" });
  }
}
