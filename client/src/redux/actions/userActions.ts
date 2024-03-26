import axios from "axios";
import { Dispatch, createAsyncThunk } from "@reduxjs/toolkit";
import { LS_CART_ITEMS, LS_USER_INFO } from "../../utils/constants";
import { RootState } from "../store";
import { userLogout, type IUserInfo } from "../slices/user";
import { clearCart } from "../slices/cart";

interface ILoginInput {
  email: string;
  password: string;
}

interface IRegisterInput extends ILoginInput {
  name: string;
}

export const login = createAsyncThunk<IUserInfo, ILoginInput>(
  "user/login",
  async ({ email, password }) => {
    const { data } = await axios.post("api/users/login", { email, password });

    localStorage.setItem(LS_USER_INFO, JSON.stringify(data));
    return data;
  }
);

export const logout = () => (dispatch: Dispatch) => {
  localStorage.removeItem(LS_USER_INFO);
  localStorage.removeItem(LS_CART_ITEMS);
  dispatch(clearCart());
  dispatch(userLogout());
};

export const register = createAsyncThunk<IUserInfo, IRegisterInput>(
  "user/register",
  async (inputData) => {
    const { data } = await axios.post("api/users/register", inputData);
    localStorage.setItem(LS_USER_INFO, JSON.stringify(data));
    return data;
  }
);
