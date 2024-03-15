import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { LS_USER_INFO } from "../../utils/constants";
import { Status } from "./types";

const initialState = {
  error: null,
  status: Status.IDLE,
  userInfo: JSON.parse(localStorage.getItem(LS_USER_INFO) || "null"),
  serverMsg: null,
  serverStatus: null,
};

export const usersSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLogin(state, { payload }) {
      state.userInfo = payload;
    },
    userLogout(state) {
      state.userInfo = null;
    },
    verificationEmail(state) {
      state.userInfo.active = true;
    },
    stateReset() {
      return initialState;
    },
  },
});

export default usersSlice.reducer;
