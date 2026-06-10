import { createContext, useContext, useState } from "react";

import axios from "axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");

    return savedUser ? JSON.parse(savedUser) : null;
  });

  // LOGIN
  const login = (email, password) => {
    // DEMO LOGIN
    const fakeUser = {
      email,
      role: "admin",
    };

    setUser(fakeUser);

    localStorage.setItem("user", JSON.stringify(fakeUser));
  };

  // LOGOUT
  const logout = async () => {
    try {
      const apiBaseUrl =
        import.meta.env.VITE_API_BASE_URL || "https://localhost:7179";

      await axios.post(
        `${apiBaseUrl}/api/auth/logout`,
        {},
        {
          withCredentials: true,
        },
      );
    } catch (error) {
      console.error("Logout API Error:", error);
    } finally {
      setUser(null);

      localStorage.removeItem("user");

      // Xóa access token nếu đang lưu
      localStorage.removeItem("token");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
