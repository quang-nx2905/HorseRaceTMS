import { createContext, useContext, useState } from "react";

import axios from "axios";

const AuthContext = createContext();

const parseJwt = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
};

const extractUserFromToken = (token) => {
  const decoded = parseJwt(token);
  if (!decoded) return null;

  // JWT Claims can use full schema URIs
  const claimEmail = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"] || decoded.email;
  const claimRole = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] || decoded.role;
  const claimName = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] || decoded.name || decoded.FullName || decoded.fullname;

  const claimId = decoded.sub || decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];

  return {
    id: claimId,
    email: claimEmail,
    role: claimRole || "User",
    name: claimName || "User",
  };
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedUser = extractUserFromToken(token);
      if (decodedUser) {
        try {
          const cachedUser = JSON.parse(localStorage.getItem("user"));
          if (cachedUser && cachedUser.avatarUrl !== undefined) {
            decodedUser.avatarUrl = cachedUser.avatarUrl;
          }
        } catch {
          // ignore parsing error
        }
        return decodedUser;
      }
    }
    // Backward compatibility for old fake user data
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // LOGIN (Takes token from API response)
  const login = (token) => {
    localStorage.setItem("token", token);
    const decodedUser = extractUserFromToken(token);
    if (decodedUser) {
      setUser(decodedUser);
      localStorage.setItem("user", JSON.stringify(decodedUser)); // Optional backup
    }
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
      localStorage.removeItem("token");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
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
