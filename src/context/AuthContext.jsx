import {
  createContext,
  useContext,
  useState,
} from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {

  const [user, setUser] = useState(() => {

    const savedUser = localStorage.getItem("user");

    return savedUser
      ? JSON.parse(savedUser)
      : null;
  });

  // LOGIN
  const login = (email, password) => {

    // DEMO LOGIN
    const fakeUser = {
      email,
      role: "admin",
    };

    setUser(fakeUser);

    localStorage.setItem(
      "user",
      JSON.stringify(fakeUser)
    );
  };

  // LOGOUT
  const logout = () => {

    setUser(null);

    localStorage.removeItem("user");
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