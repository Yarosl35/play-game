import React, { useEffect, useState } from "react";
import styles from "./resetPassword.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field } from "formik";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { LoginLayout } from "../../layout/LoginLayout";
import eyeIcon from "./eye.svg";
import { Tooltip } from "../../queries/Tooltip";
import { resetPassword } from "../../../redux/feature/extraReducers";
import { newPasswordSchema } from "../../../services/validationService";
import { passNotError } from "./../../../redux/feature/reducer";
import { Modal } from "../../Modal";

export const NewPassword = () => {
  const dispatch = useDispatch();

  const history = useHistory();

  const resetPasswordSuccess = useSelector(
    ({ resetPasswordSuccess }) => resetPasswordSuccess
  );
  const errorPass = useSelector(({ errorPass }) => errorPass);
  console.log(errorPass);

  const [showFirst, setShowFirst] = useState(false);
  const [showSecond, setShowSecond] = useState(false);
  const { token } = useParams();

  const resetPass = (value) => {
    dispatch(
      resetPassword({
        token,
        pass: value.newPassword,
        pass2: value.confirmPassword,
      })
    );
  };
  useEffect(() => {
    if (resetPasswordSuccess) {
      history.push("/login");
    }
  }, [resetPasswordSuccess, history]);
  useEffect(() => {
    if (errorPass) {
      setTimeout(() => {
        dispatch(passNotError());
      }, 2000);
    }
  }, [errorPass, dispatch]);
  return (
    <LoginLayout>
      {errorPass ? <Modal response="token error" /> : null}
      <div className={styles.containerWrapper}>
        <div className={styles.container}>
          <h2 className={styles.blockTitle}>Reset password</h2>
          <Formik
            initialValues={{
              newPassword: "",
              confirmPassword: "",
            }}
            // validationSchema={newPasswordSchema}
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
                    <div className={styles.inputContainer}>
                      <div className={styles.tooltipContainer}>
                        <label className={styles.label} htmlFor="newPassword">
                          New password
                        </label>
                        <Tooltip isLight={true} />
                      </div>
                      <div className={styles.inputWrapper}>
                        <Field
                          name="newPassword"
                          id="newPassword"
                          className={styles.input}
                          type={showFirst ? "text" : "password"}
                        />
                        {/* {errors.newPassword && touched.newPassword ? (
                        <div
                          className={styles.error}
                        >{`Error: ${errors.newPassword}`}</div>
                      ) : null} */}
                        <img
                          src={eyeIcon}
                          className={styles.icon}
                          onClick={() => setShowFirst((show) => !show)}
                          alt="show"
                        />
                      </div>
                    </div>
                    <div className={styles.inputContainer}>
                      <label className={styles.label} htmlFor="confirmPassword">
                        Confirm password
                      </label>
                      <div className={styles.inputWrapper}>
                        <Field
                          name="confirmPassword"
                          id="confirmPassword"
                          className={styles.input}
                          type={showSecond ? "text" : "password"}
                        />
                        {/* {errors.confirmPassword && touched.confirmPassword ? (
                        <div
                          className={styles.error}
                        >{`Error: ${errors.confirmPassword}`}</div>
                      ) : null} */}
                        <img
                          src={eyeIcon}
                          className={styles.icon}
                          onClick={() => setShowSecond((show) => !show)}
                          alt="show"
                        />
                      </div>
                    </div>
                  </div>
                  <button className={styles.btnReset}>Reset</button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </LoginLayout>
  );
};
