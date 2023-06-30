import React, { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import Axios from "../config/axios";

export const useSettings = () => {
  const { user } = useAuthContext();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const changePassword = async (data) => {
    setIsLoading(true);
    setError(null);
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
      params: { username: user.username },
    };
    try {
      await Axios.put(`/auth/settings`, data, config);
      setIsLoading(false);
      setError(null);
    } catch (err) {
      setIsLoading(false);
      setError(err.response.data.error);
    }
  };
  return { changePassword, isLoading, error };
};
