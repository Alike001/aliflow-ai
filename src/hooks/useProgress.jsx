import { useContext } from "react";
import { ProgressContext} from "../store/ProgressContext";

export function useProgress () {
  const context = useContext(ProgressContext);

  if(!context) {
    throw new Error (
      "useProgress must be used within an ProgressProvider and it must wrap the app in app.jsx"
    );
  }
  return context;
}