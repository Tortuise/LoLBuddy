import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();

  // dispatch logout and delete jwt
  const logout = () => {
    // remove user from storage
    localStorage.removeItem("user");

    // dispatch LOGOUT action
    dispatch({ type: "LOGOUT" });
  };
  return { logout };
};
