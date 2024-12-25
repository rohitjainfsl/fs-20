/* eslint-disable react/prop-types */
import { LiaRupeeSignSolid } from "react-icons/lia";
import { Link } from "react-router-dom";
import { useWishlist } from "../hooks/useWishlist";

function ProductCard({ product }) {
  const { toggleWishlist, isInWishlist, loading } = useWishlist();

  return (
    <div className="product">
      <div className="productImage">
        <Link to={`/product/${product._id}`}>
          <img src={product.image} alt="Product Image" />
        </Link>
      </div>
      <div className="productContent">
        <h3>
          <Link to={`/product/${product._id}`}>{product.name}</Link>
        </h3>
        <p>{product.brand}</p>
        <p className="price">
          <LiaRupeeSignSolid /> {product.price}
        </p>
        <button
          onClick={() => toggleWishlist(product._id)}
          className="addToCartBtn bg-red-500 text-white"
          disabled={loading}
        >
          {isInWishlist(product._id)
            ? "Remove from Wishlist"
            : "Add to Wishlist"}
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
