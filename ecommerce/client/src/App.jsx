import { createBrowserRouter, RouterProvider } from "react-router-dom";
import First from "./pages/First";
import Home from "./pages/Home";
import "./ecommerce.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VerifyEmail from "./pages/VerifyEmail";
import RegisterSeller from "./pages/RegisterSeller";
import ProtectedRoute from "./components/ProtectedRoute";
import AddProduct from "./pages/AddProduct";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import { AuthProvider } from "./contexts/Auth";
import SingleProduct from "./pages/SIngleProduct";
import MyCoupons from "./pages/MyCoupons";
import CartProvider from "./contexts/CartProvider";
import CreateCoupons from "./pages/CreateCoupons";
import CheckoutForm from "./pages/CheckoutForm";
import OrderSuccess from "./pages/OrderSuccess";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const StripePromise = loadStripe(import.meta.env.VITE_PUBLISHABLE_KEY);

function AppWrapper() {
  return (
    <CartProvider>
      <Elements stripe={StripePromise}>
        <First />
      </Elements>
    </CartProvider>
  );
}

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppWrapper />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/verify-email",
          element: <VerifyEmail />,
        },
        {
          path: "/register-seller",
          element: <RegisterSeller />,
        },
        {
          path: "/addProduct",
          element: (
            <ProtectedRoute>
              <AddProduct />
            </ProtectedRoute>
          ),
        },
        {
          path: "/profile",
          element: (
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          ),
        },
        {
          path: "/product/:id",
          element: <SingleProduct />,
        },
        {
          path: "/cart",
          element: (
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          ),
        },
        {
          path: "/my-coupons",
          element: (
            <ProtectedRoute>
              <MyCoupons />
            </ProtectedRoute>
          ),
        },
        {
          path: "/my-coupons/add",
          element: (
            <ProtectedRoute>
              <CreateCoupons />
            </ProtectedRoute>
          ),
        },
        {
          path: "/checkout",
          element: (
            <ProtectedRoute>
              <CheckoutForm />
            </ProtectedRoute>
          ),
        },
        {
          path: "/order-success",
          element: (
            <ProtectedRoute>
              <OrderSuccess />
            </ProtectedRoute>
          ),
        },
      ],
    },
  ]);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
