import { useEffect, useState } from "react";
import instance from "../axiosConfig";
import ProductCard from "../components/ProductCard";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const response = await instance.get("/product/get");
    console.log(response.data.products);
    setProducts(response.data.products);
  }
  return (
    <>
      <div className="products">
        {products.length > 0 &&
          products.map((product) => {
            return <ProductCard product={product} key={product.uid} />;
          })}
      </div>
    </>
  );
}

export default Home;
