import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { LS_USER_INFO } from "../../utils/constants";
import { Status } from "./types";
import { login, register } from "../actions/userActions";

export interface IUserInfo {
  active: boolean;
}

interface IUserState {
  error: null | string;
  status: Status;
  userInfo: IUserInfo | null;
  serverMsg: null | string;
  serverStatus: null;
}

const initialState: IUserState = {
  error: null,
  status: Status.IDLE,
  userInfo: JSON.parse(
    localStorage.getItem(LS_USER_INFO) || "null"
  ) as IUserInfo | null,
  serverMsg: null,
  serverStatus: null,
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
    builder.addCase(login.pending, (state, action) => {
      state.status = Status.PENDING;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.error =
        action.error.message ||
        "An unexpected error has occurred. Please try again later";
      state.status = Status.REJECTED;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.userInfo = action.payload;
      state.status = Status.RESOLVED;
    });
    builder.addCase(register.pending, (state) => {
      state.status = Status.PENDING;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.error =
        action.error.message ||
        "An unexpected error has occurred. Please try again later";
      state.status = Status.REJECTED;
    });
  },
});

export const { userLogout, verificationEmail, stateReset } = usersSlice.actions;

export default usersSlice.reducer;
