import { createSlice, createSelector } from "@reduxjs/toolkit";
import { LS_USER_INFO } from "../../utils/constants";
import { Status } from "./types";
import {
  login,
  register,
  verifyEmail,
  sendResetEmail,
  resetPassword,
  googleLogin,
} from "../actions/userActions";
import { handleError } from "./util";
import { RootState } from "../store";
import { statusHelper } from "../../utils/statusHelper";
export interface IUserInfo {
  active: boolean;
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  firstLogin: boolean;
  createdAt: string;
  token: string;
  googleImage?: string;
  googleId?: string;
}

interface IUserState {
  error: null | string;
  status: Status;
  userInfo: IUserInfo | null;
  serverMsg: null | string;
}

const initialState: IUserState = {
  error: null,
  status: Status.IDLE,
  userInfo: JSON.parse(
    localStorage.getItem(LS_USER_INFO) || "null"
  ) as IUserInfo | null,
  serverMsg: null,
};

export const usersSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLogout(state) {
      state.userInfo = null;
    },
    verificationEmail(state) {
      if (state.userInfo) {
        state.userInfo.active = true;
      }
    },
    stateReset() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.userInfo = action.payload;
      state.status = Status.RESOLVED;
    });
    builder.addCase(login.pending, (state) => {
      state.status = Status.PENDING;
    });
    builder.addCase(login.rejected, handleError);
    builder.addCase(register.fulfilled, (state, action) => {
      state.userInfo = action.payload;
      state.status = Status.RESOLVED;
    });
    builder.addCase(register.pending, (state) => {
      state.status = Status.PENDING;
    });
    builder.addCase(register.rejected, handleError);
    builder.addCase(verifyEmail.fulfilled, (state, action) => {
      state.status = Status.RESOLVED;
      if (state.userInfo) {
        state.userInfo.active = true;
        localStorage.setItem(LS_USER_INFO, JSON.stringify(state.userInfo));
      }
    });
    builder.addCase(verifyEmail.pending, (state) => {
      state.status = Status.PENDING;
    });
    builder.addCase(verifyEmail.rejected, handleError);
    builder.addCase(sendResetEmail.fulfilled, (state, action) => {
      state.status = Status.RESOLVED;
      state.serverMsg = action.payload;
    });
    builder.addCase(sendResetEmail.rejected, handleError);
    builder.addCase(sendResetEmail.pending, (state) => {
      state.status = Status.PENDING;
    });
    builder.addCase(resetPassword.fulfilled, (state, action) => {
      state.status = Status.RESOLVED;
      state.serverMsg = action.payload.data;
    });
    builder.addCase(googleLogin.pending, (state) => {
      state.status = Status.PENDING;
    });
    builder.addCase(googleLogin.fulfilled, (state, action) => {
      state.status = Status.RESOLVED;
      state.userInfo = action.payload;
    });
    builder.addCase(googleLogin.rejected, handleError);
  },
});

export const { userLogout, verificationEmail, stateReset } = usersSlice.actions;

export const getUserStatuses = createSelector(
  (state: RootState) => state.user.status,
  (status) => statusHelper(status)
);

export default usersSlice.reducer;
