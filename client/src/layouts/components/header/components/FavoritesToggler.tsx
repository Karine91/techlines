import React from "react";
import { IconButton } from "@chakra-ui/react";
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from "react-icons/md";
import { useAppSelector, useAppDispatch } from "../../../../redux/store";
import { toggleFavorites } from "../../../../redux/actions/productActions";

import { useLocation } from "react-router-dom";

const FavoritesToggler = () => {
  const dispatch = useAppDispatch();
  const { favoritesToggled } = useAppSelector((state) => state.products);
  const location = useLocation();
  if (location.pathname !== "/products") return null;

  const IconComponent = favoritesToggled
    ? MdOutlineFavorite
    : MdOutlineFavoriteBorder;

  return (
    <>
      <IconButton
        aria-label="toggle favorites"
        variant="ghost"
        onClick={() => dispatch(toggleFavorites(!favoritesToggled))}
        icon={<IconComponent size="20px" />}
      />
    </>
  );
};

export default FavoritesToggler;
