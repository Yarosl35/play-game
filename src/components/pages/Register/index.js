import styles from "./Register.module.css";
import { Formik, Form, Field } from "formik";
import { SignupSchema } from "../../../services/validationService";
import { Link } from "react-router-dom";
import { Api } from "../../../ApiDotdotfire/api";
const api = new Api();

export const Register = () => {
  const registerUser = async (loginData) => {
    const responseLoginData = await api.register(loginData);
    console.log(responseLoginData.data);
  };
  return (
    <div className={styles.bgContainer}>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={(values) => {
          registerUser(values);
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
            <div className={styles.containerLoginInput}>
              <label className={styles.labelInput}>password:</label>
              <Field
                name="password"
                className={styles.formLoginPage}
                type="password"
              />
              {errors.email && touched.email ? (
                <div className={styles.error}>{`Error: ${errors.email}`}</div>
              ) : null}
            </div>
            <div className={styles.containerLoginInput}>
              <label className={styles.labelInput}>confirm password:</label>
              <Field
                name="confirmPassword"
                className={styles.formLoginPage}
                type="confirmPassword"
              />
              {errors.email && touched.email ? (
                <div className={styles.error}>{`Error: ${errors.email}`}</div>
              ) : null}
            </div>
            <div className={styles.containerLoginInput}>
              <label className={styles.labelInput}>school name:</label>
              <Field
                name="schoolName"
                className={styles.formLoginPage}
                type="schoolName"
              />
              {errors.email && touched.email ? (
                <div className={styles.error}>{`Error: ${errors.email}`}</div>
              ) : null}
            </div>
            <div className={styles.containerLoginInput}>
              <label className={styles.labelInput}>job position:</label>
              <Field
                name="jobPosition"
                className={styles.formLoginPage}
                type="jobPosition"
              />
              {errors.email && touched.email ? (
                <div className={styles.error}>{`Error: ${errors.email}`}</div>
              ) : null}
            </div>
            <div className={styles.BtnBlock}>
              <button type="submit" className={styles.BtnLogin}>
                Register
              </button>
            </div>
          </Form>
        )}
      </Formik>
      <Link to="/login" className={styles.positionRightBtn}>
        <button className={styles.BtnReset}>Login</button>
      </Link>
    </div>
  );
};
