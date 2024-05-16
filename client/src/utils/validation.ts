import * as Yup from "yup";

const password = Yup.string()
  .min(1, "Password is too short - must contain at least 1 character.")
  .required("Password field is required");

export const validationMessages = {
  password,
  required: (field: string) => `${field} is required.`,
  email: Yup.string()
    .email("Invalid email")
    .required("This email address is required."),
  confirmPassword: password
    .required("Confirm password field is required")
    .oneOf([Yup.ref("password")], "Passwords must match"),
};
