import { useState } from "react";
import styles from "./resetPassword.module.css";
import { Formik, Form, Field } from "formik";
import { Link } from "react-router-dom";
import { LoginLayout } from "../../layout/LoginLayout";

export const ResetPassword = () => {
  return (
    <LoginLayout>
      <div className={styles.containerWrapper}>
        <div className={styles.container}>
          <h2 className={styles.blockTitle}>Reset password</h2>
          <Formik
            initialValues={{
              email: "",
            }}
            // validationSchema={RegisterSchema}
            onSubmit={(values) => {
              // server request
            }}
          >
            {({ errors, touched }) => (
              <Form className={styles.formMainContainer}>
                <p className={styles.formTitle}>What is your email?</p>
                <div className={styles.inputContainer}>
                  <Field name="email" className={styles.input} type="email" />
                  {errors.email && touched.email ? (
                    <div
                      className={styles.error}
                    >{`Error: ${errors.email}`}</div>
                  ) : null}
                </div>
              </Form>
            )}
          </Formik>
          <Link to="/reset/email">
            <button className={styles.btnSendEmail}>Send email</button>
          </Link>
        </div>
        <Link to="/login" className={styles.positionRightBtn}>
          <button className={styles.BtnReset}>Login</button>
        </Link>
      </div>
    </LoginLayout>
  );
};
