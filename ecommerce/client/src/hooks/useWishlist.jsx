import { useLocation, useNavigate } from "react-router-dom";
import instance from "../axiosConfig";
import { useAuth } from "../contexts/Auth";

//OPTIONAL CHAINING (?.)
//MDN

export function useWishlist() {
  const { isAuthenticated, user, updateUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  function isInWishlist(productId) {
    return user?.wishlist.includes(productId);
  }
  async function toggleWishlist(productId) {
    (await isInWishlist(productId))
      ? handleRemoveFromWishlist(productId)
      : handleAddToWishlist(productId);
  }

  async function handleAddToWishlist(productId) {
    if (!isAuthenticated) {
      // console.log(location)
      const currentPath = location.pathname;
      navigate("/login?referer=" + encodeURIComponent(currentPath)); // converts "/" to %2F
      return;
    }
    try {
      await instance.post("/user/wishlist/add", { productId });

      // Update user data with new wishlist
      const updatedUser = {
        ...user,
        wishlist: [...(user.wishlist || []), productId],
      };
      updateUser(updatedUser);
    } catch (error) {
      console.log("Error adding to wishlist", error);
    }
  }

  function handleRemoveFromWishlist(productId) {
    
  }

  return { isInWishlist, toggleWishlist };
}



//clean authentication
//wishlist