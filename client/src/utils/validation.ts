import * as Yup from "yup";

export const validationMessages = {
  password: Yup.string().min(
    1,
    "Password is too short - must contain at least 1 character."
  ),
  required: (field: string) => `${field} is required.`,
};
