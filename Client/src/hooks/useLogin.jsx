import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const [isAdmin, setIsAdmin] = useState(false);

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("http://localhost:3000/api/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
      return;
    }

    if (response.ok) {
      //save the user to the local storage
      localStorage.setItem("user", JSON.stringify(json));

      const isAdmin = email === "Krish78@gmail.com";
      setIsAdmin(isAdmin);
      localStorage.setItem("isAdmin", JSON.stringify(isAdmin));

      //update auth context
      dispatch({ type: "LOGIN", payload: json });

      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};
