import styles from "./Login.module.css";
import { Formik, Form, Field } from "formik";
import { SignupSchema } from "../../../services/validationService";

import icon from "./iconUser.svg";

export const Login = () => {
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
          console.log(values);
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
              <button type="button" className={styles.BtnLogin}>
                Register
              </button>
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
