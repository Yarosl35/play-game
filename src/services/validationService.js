import * as Yup from "yup";

export const SignupSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .required("Required")
    .min(8, "should be 8 chars minimum."),
});
export const RegisterSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .required("Required")
    .min(8, "should be 8 chars minimum."),
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
  schoolName: Yup.string().min(2, "should be 2 chars minimum."),
  oldPassword: Yup.string().min(8, "should be 8 chars minimum."),
  newPassword: Yup.string().min(8, "should be 8 chars minimum."),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("newPassword"), null],
    "Passwords must match"
  ),
});

export const newPasswordSchema = Yup.object().shape({
  newPassword: Yup.string()
    .required("Required")
    .min(8, "should be 8 chars minimum."),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
});
