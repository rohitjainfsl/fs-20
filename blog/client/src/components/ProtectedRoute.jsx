import { useEffect, useState } from "react";
import instance from "../axiosConfig";
import { Navigate } from "react-router-dom";
import Profile from "../pages/Profile";

function ProtectedRoute() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  //MAGIC
  useEffect(() => {
    validateToken();
  }, []);

  async function validateToken() {
    try {
      await instance.get("/auth/validate-token", { withCredentials: true });

      // If no error is thrown, set the user as authenticated
      setIsAuthenticated(true);
    } catch (error) {
      console.log(error);
      setIsAuthenticated(false);
    }
  }

  if (isLoading) return <h3>Loading...</h3>;

  return isAuthenticated ? <Profile /> : <Navigate to="/login" replace />;
}

export default ProtectedRoute;
