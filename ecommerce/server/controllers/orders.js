import { Cart } from "../models/cartModel.js";
import { Order } from "../models/orderModel.js";

export async function createOrder(req, res) {
  const userId = req.user._id;
  const { paymentIntentId } = req.body;

  try {
    //Retrieve cart
    const cart = await Cart.findOne({ user: userId }).populate("items.product");
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ error: "Cart is empty" });
    }

    //Create Order
    const order = new Order({
      user: userId,
      items: cart.items.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
        price: item.product.price,
      })),
      totalAmount: cart.totalAmount,
      shippingAddress: req.body.shippingAddress || {}, // Add shipping address if needed
      paymentStatus: "completed", // Update based on actual payment intent
    });

    await order.save();

    //Clear the cart
    cart.items = [];
    cart.totalAmount = 0;
    await cart.save();

    //Send the response back
    res.status(201).json({ message: "Order placed successfully", order });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error placing the order" });
  }
}
