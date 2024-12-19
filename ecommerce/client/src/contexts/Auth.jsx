import { createContext, useContext, useEffect, useState } from "react";
import instance from "../axiosConfig";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    const response = await instance.get("/auth/validate-token", {
      withCredentials: true,
    });
    console.log(response);
  }

  function login() {
    setIsAuthenticated(true);
  }

  async function logout() {
    const response = await instance.post("/user/logout");
    if (response.status === 200) {
      setIsAuthenticated(false);
    }
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
