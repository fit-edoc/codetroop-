import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(
    JSON.parse(localStorage.getItem("User")) || null
  );

  // Add logout function
  const logout = () => {
    localStorage.removeItem("User");
    setAuthUser(null);
  };

  // Add login function
  const login = (userData, role) => {
    const userWithRole = {
      ...userData,
      role: role || userData.role || 'vendor' // Fallback role
    };
    console.log('AuthContext login:', userWithRole);
    localStorage.setItem("User", JSON.stringify(userWithRole));
    setAuthUser(userWithRole);
  };

  // Verify user on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem("User");
    if (storedUser) {
      try {
        setAuthUser(JSON.parse(storedUser));
      } catch (error) {
        localStorage.removeItem("User");
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};