import { useState } from "react";
import styles from "./Register.module.css";
import { Formik, Form, Field } from "formik";
import { RegisterSchema } from "../../../services/validationService";
import { Link } from "react-router-dom";
import { SelectList } from "../../queries/SelectList";
import { useDispatch, useSelector } from "react-redux";
import { registerUSer } from "../../../redux/feature/reducer";

const forList = [
  { value: "1", name: "school 1" },
  { value: "2", name: "school 2" },
];
export const Register = () => {
  const dispatch = useDispatch();
  const [selectedJob, setSelectedJob] = useState("");
  const dataRegister = useSelector((e) => e.register);
  console.log(dataRegister);

  const registerUser = async (loginData) => {
    const newObj = {
      ...loginData,
      jobPosition: selectedJob,
    };
    dispatch(registerUSer(newObj));
  };
  const changeJob = (value) => {
    setSelectedJob(value);
  };
  return (
    <div className={styles.bgContainer}>
      <Formik
        initialValues={{
          email: "",
          password: "",
          confirmPassword: "",
          schoolName: "",
        }}
        validationSchema={RegisterSchema}
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
              {errors.password && touched.password ? (
                <div
                  className={styles.error}
                >{`Error: ${errors.password}`}</div>
              ) : null}
            </div>
            <div className={styles.containerLoginInput}>
              <label className={styles.labelInput}>confirm password:</label>
              <Field
                name="confirmPassword"
                className={styles.formLoginPage}
                type="password"
              />
              {errors.confirmPassword && touched.confirmPassword ? (
                <div
                  className={styles.error}
                >{`Error: ${errors.confirmPassword}`}</div>
              ) : null}
            </div>
            <div className={styles.containerSchool}>
              <label className={styles.labelInput}>school name:</label>
              <Field
                name="schoolName"
                className={styles.formLoginPage}
                type="text"
              />
              {errors.schoolName && touched.schoolName ? (
                <div
                  className={styles.error}
                >{`Error: ${errors.schoolName}`}</div>
              ) : null}
            </div>
            <div className={styles.listJob}>
              <p className={styles.labelListJob}>Job position:</p>
              <SelectList
                arrayList={forList}
                change={changeJob}
                circle={false}
                inputBig={true}
              />
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
