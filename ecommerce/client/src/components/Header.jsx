import { Link } from "react-router-dom";
import { useAuth } from "../contexts/Auth";

function Header() {
  const { isAuthenticated, logout } = useAuth();
  return (
    <header>
      <h1>
        <Link to="/">
          <span className="black">Geekster</span> Ecom
        </Link>
      </h1>

      <ul>
        <li>
          <Link to="/contact">Contact Us</Link>
        </li>

        {!isAuthenticated ? (
          <li>
            <Link to="/login">Login</Link>
          </li>
        ) : (
          <>
            <li>
              <Link to="/register-seller">Register as a Seller</Link>
            </li>
            <li>
              <Link to="/addProduct">Add Product</Link>
            </li>
            <li>
              <Link to="/cart">Cart</Link>
            </li>
            <li>
              <button onClick={logout}>Logout</button>
            </li>
          </>
        )}
      </ul>
    </header>
  );
}

export default Header;
