import { Dispatch, createAsyncThunk } from "@reduxjs/toolkit";
import { LS_CART_ITEMS, LS_USER_INFO } from "../../utils/constants";

import { userLogout, type IUserInfo } from "../slices/user";
import { clearCart } from "../slices/cart";
import { client } from "../../utils/client";

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
    const { data } = await client("api/users/login", {
      data: { email, password },
    });

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
    const { data } = await client("api/users/register", { data: inputData });
    localStorage.setItem(LS_USER_INFO, JSON.stringify(data));
    return data;
  }
);

export const verifyEmail = createAsyncThunk<void, string>(
  "user/verifyEmail",
  async (token) => {
    await client("api/users/verify-email", { token });
  }
);

export const sendResetEmail = createAsyncThunk<string, string>(
  "user/sendResetEmail",
  async (email) => {
    const { data } = await client(`api/users/password-reset-request`, {
      data: {
        email,
      },
    });
    return data;
  }
);

export const resetPassword = createAsyncThunk<
  IResetPasswordOutput,
  IResetPasswordInput
>("user/resetPassword", async ({ password, token }) => {
  const { data, status } = await client(`api/users/password-reset`, {
    data: { password },
    token,
  });
  return { data, status };
});

interface IGoogleLoginInput {
  googleId: string;
  email: string;
  name: string;
  googleImage: string;
}

export const googleLogin = createAsyncThunk<IUserInfo, IGoogleLoginInput>(
  "user/googleLogin",
  async (props) => {
    const { data } = await client("/api/users/google-login", { data: props });
    localStorage.setItem(LS_USER_INFO, JSON.stringify(data));
    return data;
  }
);
