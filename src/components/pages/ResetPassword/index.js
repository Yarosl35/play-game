import { useEffect } from "react";
import { Formik, Form, Field } from "formik";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

import { forgetPassword } from "../../../redux/feature/extraReducers";
import { LoginLayout } from "../../layout/LoginLayout";
import { ResetPasswordSchema } from "../../../services/validationService";

import styles from "./resetPassword.module.css";

export const ResetPassword = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { forgetPasswordLink, forgetPasswordError } = useSelector(
    ({ forgetPasswordLink, forgetPasswordError }) => {
      return { forgetPasswordLink, forgetPasswordError };
    }
  );
  console.log(forgetPasswordLink, forgetPasswordError);
  const resetPass = (emailData) => {
    dispatch(forgetPassword(emailData));
  };

  useEffect(() => {
    if (forgetPasswordLink) {
      history.push("/reset/email");
    }
  }, [forgetPasswordLink, history]);
  return (
    <LoginLayout>
      <div className={styles.containerWrapper}>
        <div className={styles.container}>
          <h2 className={styles.blockTitle}>Reset password</h2>
          <Formik
            initialValues={{
              email: "",
            }}
            validationSchema={ResetPasswordSchema}
            onSubmit={(values) => {
              resetPass(values);
            }}
          >
            {({ errors, touched }) => (
              <Form>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div className={styles.formMainContainer}>
                    <p className={styles.formTitle}>What is your email?</p>
                    <div className={styles.inputContainer}>
                      <Field
                        name="email"
                        className={styles.input}
                        type="email"
                      />
                      {errors.email && touched.email ? (
                        <div
                          className={styles.error}
                        >{`Error: ${errors.email}`}</div>
                      ) : null}
                    </div>
                  </div>
                  <button className={styles.BtnReset}>Login</button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </LoginLayout>
  );
};
