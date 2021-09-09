import React, { useState } from "react";
import styles from "./resetPassword.module.css";
import { Formik, Form, Field } from "formik";
import { Link } from "react-router-dom";
import { LoginLayout } from "../../layout/LoginLayout";
import eyeIcon from "./eye.svg";
import { Tooltip } from "../../queries/Tooltip";

export const NewPassword = () => {
  const [showFirst, setShowFirst] = useState(false);
  const [showSecond, setShowSecond] = useState(false);

  return (
    <LoginLayout>
      <div className={styles.containerWrapper}>
        <div className={styles.container}>
          <h2 className={styles.blockTitle}>Reset password</h2>
          <Formik
            initialValues={{
              newPassword: "",
              confirmPassword: "",
            }}
            // validationSchema={RegisterSchema}
            onSubmit={(values) => {
              // server request
            }}
          >
            {({ errors, touched }) => (
              <Form className={styles.formMainContainer}>
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
                    {errors.email && touched.email ? (
                      <div
                        className={styles.error}
                      >{`Error: ${errors.email}`}</div>
                    ) : null}
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
                    {errors.email && touched.email ? (
                      <div
                        className={styles.error}
                      >{`Error: ${errors.email}`}</div>
                    ) : null}
                    <img
                      src={eyeIcon}
                      className={styles.icon}
                      onClick={() => setShowSecond((show) => !show)}
                      alt="show"
                    />
                  </div>
                </div>
              </Form>
            )}
          </Formik>
          <Link to="/reset/email">
            <button className={styles.btnReset}>Reset</button>
          </Link>
        </div>
      </div>
    </LoginLayout>
  );
};
