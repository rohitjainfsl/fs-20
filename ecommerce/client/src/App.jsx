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
import { AuthProvider } from "./contexts/Auth";
import SingleProduct from "./pages/SIngleProduct";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <First />,
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
