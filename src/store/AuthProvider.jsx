import { useState, useCallback } from "react";
import { MOCK_USERS } from "../data/courses";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("el_user"))|| null;
    } catch {
      return null;
    }
  });

  const login = useCallback((email, password) => {
    const match = MOCK_USERS.find((u) => u.email === email && u.password === password);
    
    if (match) {
      const { password: _removed, ...safe } = match;
      setUser(safe);
      localStorage.setItem("el_user", JSON.stringify(safe));
      return { ok: true};
    }
    return { ok: false, error: "Invalid email or password"};
  }, []);
  
  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("el_user");
  }, []);

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
  };
  return(
    <AuthContext.Provider value={value}>
      { children }
    </AuthContext.Provider>
  );
}