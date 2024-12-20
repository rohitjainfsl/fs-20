import { Link } from "react-router-dom";
import { useAuth } from "../contexts/Auth";
import { FaCog, FaCaretDown } from "react-icons/fa";

function Header() {
  const { isAuthenticated, logout } = useAuth();

  async function handleLogout() {
    await logout();
  }

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
              <Link to="">
                <FaCog /> <FaCaretDown />
              </Link>
              <ul className="submenu">
                <li>
                  <Link to="/profile">My Profile</Link>
                </li>
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </ul>
            </li>
          </>
        )}
      </ul>
    </header>
  );
}

export default Header;
