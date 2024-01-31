import { createAsyncThunk } from "@reduxjs/toolkit";
import { Pagination } from "../slices/product";
import axios from "axios";
import { IProduct } from "../../types/Product";

export const getProducts = createAsyncThunk<
  {
    products: IProduct[];
    pagination: Pagination;
  },
  { page: number; favoriteToggled: boolean }
>("products/getProducts", async ({ page, favoriteToggled }) => {
  const {
    data: { products, pagination },
  } = await axios.get("/api/products");
  return {
    products,
    pagination,
  };
});
