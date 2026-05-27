import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
    
    setLoading(false);
  }, []);

  const login = (email, password) => {
    const userData = {
      id: "1",
      email: email,
      name: email.split("@")[0],
      role: "admin",
    };

    localStorage.setItem("token", "horse-race-demo-token-" + Date.now());
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    return true;
  };

  const register = (fullName, email, password) => {
    const userData = {
      id: "1",
      email: email,
      name: fullName,
      role: "user",
    };

    localStorage.setItem("token", "horse-race-demo-token-" + Date.now());
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    return true;
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
