import React, { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import Axios from "../config/axios";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async ({ username, password, checked }) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await Axios.post("/auth/login", {
        username,
        password,
        checked,
      });

      const json = response.data;
      // save user to local storage
      localStorage.setItem("user", JSON.stringify(json));

      // update the auth context
      dispatch({ type: "LOGIN", payload: json });
      setIsLoading(false);
      setError(null);
      return true;
    } catch (err) {
      setIsLoading(false);
      setError(err.response.data.error);
      return false;
    }
  };
  return { login, isLoading, error };
};
