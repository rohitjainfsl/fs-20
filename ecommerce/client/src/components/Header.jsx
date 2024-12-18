import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <h1>
        <Link to="/">
          <span className="black">Geekster</span> Ecom
        </Link>
      </h1>

      <ul>
        <li>
          <Link to="/cart">Cart</Link>
          <Link to="/contact">Contact Us</Link>
          <Link to="/login">Login</Link>
          <Link to="/register-seller">Register as a Seller</Link>
          <Link to="/addProduct">Add Product</Link>
        </li>
      </ul>
    </header>
  );
}

export default Header;
