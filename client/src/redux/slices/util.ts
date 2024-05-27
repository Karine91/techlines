import { Status } from "./types";
import { PayloadAction, SerializedError } from "@reduxjs/toolkit";

export const handleError = <
  IState extends { error: null | string; status: Status }
>(
  state: IState,
  action: PayloadAction<unknown, string, any, SerializedError>
) => {
  state.error =
    (action.payload as string) ||
    action.error.message ||
    "An unexpected error has occurred. Please try again later";
  state.status = Status.REJECTED;
};
