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
      await instance.get("/auth/check");
      // If no error is thrown, set the user as authenticated
      setIsAuthenticated(true);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false); //remove the loader from the screen
    }
  }

  if (isLoading) return <h3>Loading...</h3>;

  return isAuthenticated ? <Profile /> : <Navigate to="/login" replace />;
}

export default ProtectedRoute;
