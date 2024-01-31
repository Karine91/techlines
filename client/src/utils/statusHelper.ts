import { Status } from "../redux/slices/types";

export const statusHelper = (status: Status) => {
  return {
    isIdle: status === "idle",
    isLoading: status === "pending",
    isError: status === "rejected",
    isSuccess: status === "resolved",
  };
};
