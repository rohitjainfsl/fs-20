/* eslint-disable react/prop-types */
import { LiaRupeeSignSolid } from "react-icons/lia";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
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
        <Link to="" className="addToCartBtn">
          Add To Cart
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;
