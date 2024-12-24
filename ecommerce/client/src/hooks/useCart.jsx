import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/Auth";
import instance from "../axiosConfig";

function useCart() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

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
      console.log(response);
    } catch (error) {
      console.log("Error adding product to cart", error);
    }
  }

  return { addToCart };
}

export default useCart;
