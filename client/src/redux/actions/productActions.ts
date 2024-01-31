import { RootState } from "./../store";
import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Pagination, setFavorites } from "../slices/product";
import axios from "axios";
import { IProduct } from "../../types/Product";
import { LS_FAVORITES_KEY } from "../../utils/constants";
import { setFavoritesToggled, setProducts } from "../slices/product";

interface IProductsRes {
  products: IProduct[];
  pagination: Pagination;
}

interface IProductsInput {
  page: number;
  favoriteToggled?: boolean;
}

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async ({ page }: IProductsInput | void = {} as IProductsInput) => {
    const perPage = 10;
    const {
      data: { products, pagination },
    } = await axios.get(`/api/products/${page}/${perPage}`);
    return {
      products,
      pagination,
    } as IProductsRes;
  }
);

export const toggleFavorites = createAsyncThunk<
  void,
  boolean,
  {
    state: RootState;
  }
>("products/toggleFavorites", async (toggle, thunkApi) => {
  const {
    products: { products, favorites },
  } = thunkApi.getState();
  thunkApi.dispatch(setFavoritesToggled(toggle));
  if (toggle) {
    const filteredProducts = products.filter((item) =>
      favorites.includes(item._id)
    );
    thunkApi.dispatch(setProducts(filteredProducts));
  } else {
    thunkApi.dispatch(getProducts({ page: 1 }));
  }
});
