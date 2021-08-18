import React, { useState } from "react";
import styles from "./Login.module.css";
import { Formik, Form, Field } from "formik";
import { SignupSchema } from "../../../services/validationService";
import { Api } from "../../../ApiDotdotfire/api";
import { Link } from "react-router-dom";
import icon from "./iconUser.svg";
const api = new Api();

export const Login = () => {
  const sendDataLogin = async (loginData) => {
    const responseLoginData = await api.LoginUser(loginData);
    console.log(responseLoginData.data);
  };
  return (
    <div className={styles.bgContainer}>
      <div className={styles.iconUser}>
        <img src={icon} alt="icon" />
      </div>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={(values) => {
          sendDataLogin(values);
        }}
      >
        {({ errors, touched }) => (
          <Form className={styles.formMainContainer}>
            <div className={styles.containerLoginInput}>
              <label className={styles.labelInput}>email:</label>
              <Field
                name="email"
                className={styles.formLoginPage}
                type="email"
              />
              {errors.email && touched.email ? (
                <div className={styles.error}>{`Error: ${errors.email}`}</div>
              ) : null}
            </div>
            <div className={styles.containerPasswordInput}>
              <label className={styles.labelInput}>password:</label>
              <Field
                name="password"
                className={styles.formLoginPage}
                type="password"
              />
              {errors.password && touched.password ? (
                <div
                  className={styles.error}
                >{`Error: ${errors.password}`}</div>
              ) : null}
            </div>
            <div className={styles.BtnBlock}>
              <Link to="/register">
                <button type="button" className={styles.BtnLogin}>
                  Register
                </button>
              </Link>
              <button type="submit" className={styles.BtnLogin}>
                Login
              </button>
            </div>
          </Form>
        )}
      </Formik>
      <button className={styles.BtnReset}>Forget password</button>
    </div>
  );
};
