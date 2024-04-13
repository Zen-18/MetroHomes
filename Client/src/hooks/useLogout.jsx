import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();

  const logout = () => {
    //remove user form local storage
    localStorage.removeItem("user");

    //dispatch logout asction
    dispatch({ type: "LOGOUT" });
  };

  return { logout };
};
