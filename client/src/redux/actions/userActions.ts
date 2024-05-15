import axios from "axios";
import { Dispatch, createAsyncThunk } from "@reduxjs/toolkit";
import { LS_CART_ITEMS, LS_USER_INFO } from "../../utils/constants";

import { userLogout, type IUserInfo } from "../slices/user";
import { clearCart } from "../slices/cart";

interface ILoginInput {
  email: string;
  password: string;
}

interface IRegisterInput extends ILoginInput {
  name: string;
}

interface IResetPasswordInput {
  password: string;
  token: string;
}

interface IResetPasswordOutput {
  data: string;
  status: number;
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

export const verifyEmail = createAsyncThunk<void, string>(
  "user/verifyEmail",
  (token) => {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    return axios.get("api/users/verify-email", config);
  }
);

export const sendResetEmail = createAsyncThunk<string, string>(
  "user/sendResetEmail",
  async (email) => {
    const { data } = await axios.post(`api/users/password-reset-request`, {
      email,
    });
    return data;
  }
);

export const resetPassword = createAsyncThunk<
  IResetPasswordOutput,
  IResetPasswordInput
>("user/resetPassword", async ({ password, token }) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const { data, status } = await axios.post(
    `api/users/password-reset`,
    {
      password,
    },
    config
  );
  return { data, status };
});
