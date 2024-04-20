import React, { useContext, useEffect, useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { useMutation } from "react-query";
import { useAuthContext } from "../../hooks/useAuthContext";
import UserDetailContext from "../../Context/UserDetailContext";
import { toFav } from "../../utils/api";
import { checkFavourites, updateFavourites } from "../../utils/common";

const Heart = ({ id }) => {
  const [heartColor, setHeartColor] = useState("white");
  const { user } = useAuthContext();

  const { mutate } = useMutation({
    mutationFn: () => toFav(id, user?.email, token),
    onSuccess: () => {
      setUserDetails((prev) => ({
        ...prev,
        favourites: updateFavourites(id, prev.favourites),
      }));
    },
  });

  const {
    userDetails: { token, favourites },
    setUserDetails,
  } = useContext(UserDetailContext);

  useEffect(() => {
    setHeartColor(() => checkFavourites(id, favourites));
  }, [favourites]);

  const handleLike = () => {
    mutate();
    setHeartColor((prev) => (prev === "#fa3e5f" ? "white" : "#fa3e5f"));
  };
  return (
    <AiFillHeart
      size={24}
      color={heartColor}
      onClick={(e) => {
        e.stopPropagation();
        handleLike();
      }}
    />
  );
};

export default Heart;
