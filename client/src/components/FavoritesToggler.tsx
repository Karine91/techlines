import React from "react";
import { IconButton } from "@chakra-ui/react";
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorites } from "../redux/actions/productActions";
import { AppDispatch, RootState } from "../redux/store";

const FavoritesToggler = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { favoritesToggled } = useSelector(
    (state: RootState) => state.products
  );

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
