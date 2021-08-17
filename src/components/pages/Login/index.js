import styles from "./Login.module.css";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import icon from "./iconUser.svg";

const SignupSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string(),
});
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
          // same shape as initial values
          console.log(values);
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <div className={styles.containerLoginInput}>
              <label className={styles.labelInput}>email:</label>
              <Field name="email" className={styles.formLogin} type="email" />
              {errors.email && touched.email ? <div>{errors.email}</div> : null}
            </div>
            <div className={styles.containerPasswordInput}>
              <label className={styles.labelInput}>password:</label>
              <Field
                name="password"
                className={styles.formLogin}
                type="password"
              />
              {errors.password && touched.password ? (
                <div>{errors.password}</div>
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
