import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import instance from "../axiosConfig";
import { useWishlist } from "../hooks/useWishlist";
import useCart from "../hooks/useCart";

function SingleProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState({});

  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart();

  useEffect(() => {
    fetchData(id);
  }, [id]);

  async function fetchData(id) {
    const response = await instance.get("/product/get/" + id);
    console.log(response);
    setProduct(response.data);
  }

  return (
    <>
      {product && (
        <div id="singleProduct">
          <div className="left">
            <img src={product.image} alt="Product Image" />
          </div>
          <div className="right">
            <h3>{product.title}</h3>
            <p>
              <em>Category: </em>
              {product.category}
            </p>
            <p>
              <em>Brand: </em>
              {product.brand}
            </p>
            <p>
              <em>Price: </em>
              {product.price}
            </p>
            <p>{product.description}</p>

            <button
              onClick={() => toggleWishlist(product._id)}
              className="addToCartBtn"
            >
              {isInWishlist(product._id)
                ? "Remove from Wishlist"
                : "Add to Wishlist"}
            </button>

            <button
              onClick={() => addToCart(product._id)}
              className="addToCartBtn"
            >
              Add to Cart
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default SingleProduct;
