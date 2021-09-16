import * as Yup from "yup";

export const SignupSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .required("Required")
    .matches("(?=.*[a-z])(?=.*[0-9])(?=.{8,24})", "Password must be formed with 8 characters including big and small letters and numbers")
});
export const RegisterSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .required("Required")
    .matches("(?=.*[a-z])(?=.*[0-9])(?=.{8,24})", "Password must be formed with 8 characters including big and small letters and numbers"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
  fullName: Yup.string()
    .min(2, "should be 2 chars minimum.")
    .required("Required"),
  schoolName: Yup.string()
    .min(2, "should be 2 chars minimum.")
    .required("Required"),
});
export const UserSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  fullName: Yup.string()
    .trim()
    .matches(/^[a-zA-Z\s]*$/, "Is not in correct format")
    .required("Required"),
  schoolName: Yup.string().min(2, "should be 2 chars minimum.")
});

export const newPasswordSchema = Yup.object().shape({
  newPassword: Yup.string()
    .required("Required")
    .matches("(?=.*[a-z])(?=.*[0-9])(?=.{8,24})", "Password must be formed with 8 characters including big and small letters and numbers"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("newPassword"), null],
    "Passwords must match"
  ),
});

export const updatePasswordSchema = Yup.object().shape({
  oldPassword: Yup.string().matches("(?=.*[a-z])(?=.*[0-9])(?=.{8,24})", "Password must be formed with 8 characters including big and small letters and numbers"),
  newPassword: Yup.string().matches("(?=.*[a-z])(?=.*[0-9])(?=.{8,24})", "Password must be formed with 8 characters including big and small letters and numbers"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("newPassword"), null],
    "Passwords must match"
  ),
});

export const ResetPasswordSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
});

export const CreatePlayerSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email"),
  name: Yup.string()
    .trim()
    .required("Name is required."),
});

export const isEmail = (email) => {
  const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return pattern.test(String(email).toLowerCase());
}