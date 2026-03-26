import { useContext } from "react";
import { AuthContext } from "../store/AuthContext";

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      "useAuth must be used within an AuthProvider and it must wrap the app in app.jsx"
    );
  }
  return context;
}