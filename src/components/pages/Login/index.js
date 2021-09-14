import React, { useEffect, useRef } from "react";
import styles from "./Login.module.css";
import { Formik, Form, Field } from "formik";
import { SignupSchema } from "../../../services/validationService";
import { Link, useHistory } from "react-router-dom";
import icon from "./iconUser.svg";
import { LoginLayout } from "../../layout/LoginLayout";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../../redux/feature/extraReducers";
import { loginNotError } from "../../../redux/feature/reducer";
import { Tooltip } from "../../queries/Tooltip";
import { reconnectSocket } from '../../../socket'

export const Login = () => {
  const dispatch = useDispatch();
  const formikRef = useRef();

  const loginError = useSelector(({ loginError }) => loginError);
  const dataLogin = useSelector((dataLogin) => dataLogin);

  const sendDataLogin = async (loginData) => {
    dispatch(loginNotError());
    dispatch(loginUser(loginData));
  };
  const history = useHistory();

  useEffect(() => {
    if (dataLogin.auth) {
      reconnectSocket();
      return history.push(process.env.REACT_APP_REDIRECT_MAIN_PAGE);
    }
  }, [dataLogin.auth, history]);
  useEffect(() => {
    if (loginError) {
      formikRef.current.setFieldError("passwordError", "Error: please check email or password");
    }
  }, [loginError]);

  return (
    <LoginLayout>
      <div className={styles.bgContainer}>
        <div className={styles.iconUser}>
          <img src={icon} alt="icon" />
        </div>
        <Formik
          innerRef={formikRef}
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
                {errors.passwordUsername && (
                  <div className={styles.error}>{errors.passwordUsername}</div>
                )}
              </div>
              <div className={styles.containerPasswordInput}>
                <label className={styles.labelInput}>password:</label>
                <Field
                  name="password"
                  className={styles.formLoginPage}
                  type="password"
                  autoComplete="off"
                />
                <div className={styles.containerTooltip}>
                  <Tooltip />
                </div>
                {errors.password && touched.password ? (
                  <div
                    className={styles.error}
                  >{`Error: ${errors.password}`}</div>
                ) : null}
                {errors.passwordError && (
                  <div className={styles.error}>{errors.passwordError}</div>
                )}
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
