/* eslint-disable react/prop-types */
import { LiaRupeeSignSolid } from "react-icons/lia";
import { Link } from "react-router-dom";
import { useWishlist } from "../hooks/useWishlist";

function ProductCard({ product }) {
  const { toggleWishlist, isInWishlist } = useWishlist();
  return (
    <div className="product">
      <div className="productImage">
        <img src={product.image} alt="Product Image" />
      </div>
      <div className="productContent">
        <h3>{product.name}</h3>
        <p>{product.brand}</p>
        <p className="price">
          <LiaRupeeSignSolid /> {product.price}
        </p>
        <button
          onClick={() => toggleWishlist(product._id)}
          className="addToCartBtn"
        >
          {isInWishlist(product._id)
            ? "Remove from Wishlist"
            : "Add to Wishlist"}
        </button>
        <Link to="" className="addToCartBtn">
          Add To Cart
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;
