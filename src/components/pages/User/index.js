import { Field, Form, Formik } from "formik";
import React, { useEffect } from "react";
import { UserSchema } from "./../../../services/validationService";
import styles from "./User.module.css";
// import { Api } from "./../../../API/dotdotfire";
import { Panel } from "../../layout/Panel";
import { getUser } from "./../../../redux/feature/reducer";
import { useDispatch } from "react-redux";
// const datauser = new Api();

export const User = () => {
  const dispatch = useDispatch();
  // const [user, setUser] = useState({});

  // const dataUserInfo = async () => {
  //   const dataUser = await datauser.getUser();
  //   setUser(dataUser.data.details);
  // };

  useEffect(() => {
    dispatch(getUser());
  }, []);
  return (
    <Panel>
      <div className={styles.containerWrapper}>
        <div className={styles.container}>
          <Formik
            initialValues={{
              email: "test@email.com",
              fullName: "full name",
              schoolName: "school name",
              oldPassword: "",
              newPassword: "",
              confirmPassword: "",
            }}
            validationSchema={UserSchema}
            enableReinitialize={true}
            onSubmit={(values) => {
              console.log(values);
            }}
          >
            {({ errors, touched }) => (
              <Form className={styles.formMainContainer}>
                <h2 className={styles.blockTitle}>User Info</h2>

                <div className={styles.inputContainer}>
                  <label className={styles.labelInput}>email</label>
                  <Field
                    name="email"
                    className={styles.input}
                    type="email"
                    disabled
                  />
                  {errors.email && touched.email ? (
                    <div
                      className={styles.error}
                    >{`Error: ${errors.email}`}</div>
                  ) : null}
                </div>
                <div className={styles.inputContainer}>
                  <label className={styles.labelInput}>full name</label>
                  <Field name="fullName" className={styles.input} type="text" />
                  {errors.fullName && touched.fullName ? (
                    <div
                      className={styles.error}
                    >{`Error: ${errors.fullName}`}</div>
                  ) : null}
                </div>
                <div className={styles.inputContainer}>
                  <label className={styles.labelInput}>school</label>
                  <Field
                    name="schoolName"
                    className={styles.input}
                    type="text"
                  />
                  {errors.schoolName && touched.schoolName ? (
                    <div
                      className={styles.error}
                    >{`Error: ${errors.schoolName}`}</div>
                  ) : null}
                </div>

                <h2 className={styles.blockTitle}>Security</h2>

                <div className={styles.inputContainer}>
                  <label className={styles.labelInput}>old password</label>
                  <Field
                    name="oldPassword"
                    className={styles.input}
                    type="password"
                  />
                  {errors.oldPassword && touched.oldPassword ? (
                    <div
                      className={styles.error}
                    >{`Error: ${errors.oldPassword}`}</div>
                  ) : null}
                </div>
                <div className={styles.inputContainer}>
                  <label className={styles.labelInput}>new password</label>
                  <Field
                    name="newPassword"
                    className={styles.input}
                    type="password"
                  />
                  {errors.newPassword && touched.newPassword ? (
                    <div
                      className={styles.error}
                    >{`Error: ${errors.newPassword}`}</div>
                  ) : null}
                </div>
                <div className={styles.inputContainer}>
                  <label className={styles.labelInput}>confirm password</label>
                  <Field
                    name="confirmPassword"
                    className={styles.input}
                    type="password"
                  />
                  {errors.confirmPassword && touched.confirmPassword ? (
                    <div
                      className={styles.error}
                    >{`Error: ${errors.confirmPassword}`}</div>
                  ) : null}
                </div>

                <div className={styles.btnBlock}>
                  <button type="submit" className={styles.btnSave}>
                    Save
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </Panel>
  );
};
