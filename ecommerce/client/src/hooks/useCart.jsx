import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/Auth";
import instance from "../axiosConfig";
import { useEffect, useState } from "react";

function useCart() {
  const { isAuthenticated } = useAuth();
  const [cart, setCart] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) fetchCart();
  }, [isAuthenticated]);

  async function addToCart(productId, quantity = 1) {
    if (!isAuthenticated) {
      const currentPath = location.pathname;
      navigate(`/login?referer=${encodeURIComponent(currentPath)}`);
      return;
    }
    try {
      const response = await instance.post("/cart/add", {
        productId,
        quantity,
      });
      console.log(response.data.cart);
      setCart(response.data.cart);
    } catch (error) {
      console.log("Error adding product to cart", error);
    }
  }

  async function fetchCart() {
    if (!isAuthenticated) return;
    try {
      const response = await instance.get("/cart");
      setCart(response.data.cart);
      // console.log(response.data.cart);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  }

  async function updateQuantity(productId, quantity) {
    try {
      const response = await instance.put("/cart/quantity", {
        productId,
        quantity,
      });
      setCart(response.data.cart);
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  }
  async function removeFromCart(productId) {
    try {
      const response = await instance.delete("/cart/remove/" + productId);
      console.log(response);
      setCart(response.data.cart);
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  }

  return { addToCart, cart, fetchCart, updateQuantity, removeFromCart };
}

export default useCart;
