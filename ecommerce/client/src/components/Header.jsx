import { Link } from "react-router-dom";
import { useAuth } from "../contexts/Auth";
import { useCart } from "../hooks/useCart";
import { useEffect } from "react";

function Header() {
  const { isAuthenticated, user, logout, loading } = useAuth();
  const { cart, fetchCart } = useCart();

  useEffect(() => {
    if (isAuthenticated) fetchCart();
  }, [isAuthenticated]);

  const handleLogout = async () => {
    await logout();
  };

  // Don't show header while checking authentication
  if (loading) {
    return null;
  }

  return (
    <header className="bg-red-500 text-white">
      <h1 className="text-3xl">
        <Link to="/" className="font-extrabold">
          <span className="font-extrabold mr-2">Geekster </span> Ecom
        </Link>
      </h1>

      <ul>
        <li>
          <Link to="/contact">Contact Us</Link>

          {/* Conditional rendering based on authentication */}
          {isAuthenticated ? (
            <>
              <Link to="/cart" className="relative">
                Cart{" "}
                {cart?.items?.length > 0 && (
                  <span className="absolute top-2 -right-3 bg-white text-black rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {cart.items.length}
                  </span>
                )}
              </Link>
              <Link to="/addProduct">Add Product</Link>
              <Link to="/profile">Profile</Link>
              <button
                onClick={handleLogout}
                className="bg-slate-600 p-1 rounded hover:bg-slate-800"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register-seller">Register as a Seller</Link>
            </>
          )}
        </li>
      </ul>
    </header>
  );
}

export default Header;
