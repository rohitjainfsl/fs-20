import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/Auth";

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <h3>Loading...</h3>;
  return isAuthenticated ? children : <Navigate to="/login" replace />;

  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const [isLoading, setIsLoading] = useState(true);
  //MAGIC
  // useEffect(() => {
  //   validateToken();
  // }, []);

  // async function validateToken() {
  //   try {
  //     await instance.get("/auth/check");
  //     // If no error is thrown, set the user as authenticated
  //     setIsAuthenticated(true);
  //     setIsLoading(false);
  //   } catch (error) {
  //     console.log(error);
  //     setIsAuthenticated(false);
  //   } finally {
  //     setIsLoading(false); //remove the loader from the screen
  //   }
  // }
}

export default ProtectedRoute;
