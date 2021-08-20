import React, { useEffect } from "react";
import styles from "./Login.module.css";
import { Formik, Form, Field } from "formik";
import { SignupSchema } from "../../../services/validationService";
import { Link, useHistory } from "react-router-dom";
import icon from "./iconUser.svg";
import { LoginLayout } from "../../layout/LoginLayout";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../../redux/feature/reducer";

export const Login = () => {
  const auth = useSelector(({ auth }) => auth);
  const dispatch = useDispatch();
  const sendDataLogin = async (loginData) => {
    dispatch(loginUser(loginData));
  };
  const history = useHistory();
  useEffect(() => {
    if (auth) return history.push("/players");
  }, [auth]);
  return (
    <LoginLayout>
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
        <Link className={styles.BtnResetLink} to="/reset">
          <button className={styles.BtnReset}>Forget password</button>
        </Link>
      </div>
    </LoginLayout>
  );
};
