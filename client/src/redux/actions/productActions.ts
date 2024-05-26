import { createAsyncThunk } from "@reduxjs/toolkit";
import { IProduct } from "../../types/Product";
import { client } from "../../utils/client";
import {
  Pagination,
  setFavoritesToggled,
  setProducts,
} from "../slices/product";
import { RootState } from "./../store";

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
    } = await client(`/api/products/${page}/${perPage}`);
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

export const getProduct = createAsyncThunk(
  "products/getProduct",
  async (id: string) => {
    const { data } = await client(`/api/products/${id}`);
    return data as IProduct;
  }
);
