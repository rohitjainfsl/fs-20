import { createContext, useContext, useEffect, useState } from "react";
import instance from "../axiosConfig";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    try {
      const response = await instance.get("/auth/validate-token", {
        withCredentials: true,
      });
      console.log(response);
      setIsAuthenticated(true);
    } catch (error) {
      setIsAuthenticated(false);
    }
  }

  function login() {
    setIsAuthenticated(true);
  }

  function authenticate() {
    setIsAuthenticated(true);
  }

  function deAuthenticate() {
    setIsAuthenticated(false);
  }

  console.log("isAuthenticated", isAuthenticated);

  async function logout() {
    try {
      const response = await instance.post("/user/logout", {
        withCredentials: true,
      });
      if (response.status === 200) {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsAuthenticated(false);
      window.location.href = "/login";
    }
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        loading,
        login,
        logout,
        authenticate,
        deAuthenticate,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
