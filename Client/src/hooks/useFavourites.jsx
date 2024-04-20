// useFavourites.js
import { useContext, useEffect, useRef } from "react";
import { useQuery } from "react-query";
import { getAllFav } from "../utils/api";
import UserDetailContext from "../Context/UserDetailContext";

const useFavourites = () => {
  const { userDetails, setUserDetails } = useContext(UserDetailContext);
  const queryRef = useRef();

  const { data, isLoading, isError, refetch } = useQuery(
    "allFavourites",
    () => getAllFav(userDetails?.email, userDetails?.token),
    {
      onSuccess: (data) => {
        setUserDetails((prev) => ({ ...prev, favourites: data }));
      },
      enabled: !!userDetails?.token && !!userDetails?.email,
      staleTime: 30000,
    }
  );

  queryRef.current = refetch;

  useEffect(() => {
    if (userDetails?.token) {
      queryRef.current && queryRef.current();
    }
  }, [userDetails?.token]);

  return { data, isError, isLoading, refetch };
};

export default useFavourites;
