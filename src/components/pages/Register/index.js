import { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import styles from "./Register.module.css";
import { Formik, Form, Field } from "formik";
import { RegisterSchema } from "../../../services/validationService";
import { Link } from "react-router-dom";
import { SelectList } from "../../queries/SelectList";
import { LoginLayout } from "../../layout/LoginLayout";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "../../Modal";
import { registerUser, closeModal } from "../../../redux/feature/reducer";
import { Tooltip } from "../../queries/Tooltip";

const forList = [
  { id: 1, value: "teacher", name: "Teacher" },
  { id: 2, value: "technician", name: "Technician" },
  { id: 3, value: "principle", name: "Principle" },
];
export const Register = () => {
  const formikRef = useRef();
  const resRegistration = useSelector((resData) => resData);
  const createdUserShow = useSelector(
    ({ createdUserShow }) => createdUserShow.show
  );
  const dispatch = useDispatch();
  const [selectedJob, setSelectedJob] = useState(forList[0].value);

  const regUser = async (registrationData) => {
    const newObj = {
      email: registrationData.email,
      password: registrationData.password,
      fullName: registrationData.fullName,
      school: registrationData.schoolName,
      jobPosition: selectedJob,
    };
    dispatch(registerUser(newObj));
  };
  const changeJob = (value) => {
    setSelectedJob(value);
  };
  const history = useHistory();
  useEffect(() => {
    if (createdUserShow) {
      setTimeout(() => {
        dispatch(closeModal());
        return history.push("/login");
      }, 3000);
    }
  }, [createdUserShow, dispatch, history]);
  useEffect(() => {
    if (resRegistration.emailUserError) {
      formikRef.current.setFieldError(
        "emailError",
        "Error: email is already taken"
      );
    }
  }, [resRegistration.emailUserError]);
  return (
    <LoginLayout>
      {resRegistration.createdUserShow.show ? (
        <Modal response={resRegistration} />
      ) : null}
      <div className={styles.bgContainer}>
        <Formik
          innerRef={formikRef}
          initialValues={{
            email: "",
            password: "",
            confirmPassword: "",
            fullName: "",
            schoolName: "",
          }}
          validationSchema={RegisterSchema}
          onSubmit={(values, { setFieldError }) => {
            regUser(values, setFieldError);
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
                {errors.emailError && (
                  <div className={styles.error}>{errors.emailError}</div>
                )}
              </div>
              <div className={styles.containerLoginInput}>
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
              </div>
              <div className={styles.containerLoginInput}>
                <label className={styles.labelInput}>confirm password:</label>
                <Field
                  name="confirmPassword"
                  className={styles.formLoginPage}
                  type="password"
                  autoComplete="off"
                />
                {errors.confirmPassword && touched.confirmPassword ? (
                  <div
                    className={styles.error}
                  >{`Error: ${errors.confirmPassword}`}</div>
                ) : null}
              </div>
              <div className={styles.containerSchool}>
                <label className={styles.labelInput}>full name</label>
                <Field
                  name="fullName"
                  className={styles.formLoginPage}
                  type="text"
                />
                {errors.fullName && touched.fullName ? (
                  <div
                    className={styles.error}
                  >{`Error: ${errors.fullName}`}</div>
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
    </LoginLayout>
  );
};
