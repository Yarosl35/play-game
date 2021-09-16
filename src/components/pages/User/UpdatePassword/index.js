import { Field, Form, Formik } from "formik";
import React  from "react";
import { updatePasswordSchema } from "../../../../services/validationService";
import styles from "../User.module.css";
import { updatePassword } from "../../../../redux/feature/extraReducers";
import { useDispatch } from "react-redux";
import { setPopupMessage } from "../../../../redux/feature/reducer";
import { ERROR } from "../../../../constants";

export const UpdatePassword = () => {
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      }}
      validationSchema={updatePasswordSchema}
      enableReinitialize={true}
      onSubmit={async (values,{ resetForm }) => {
        let res = await dispatch(updatePassword(values));
        dispatch(setPopupMessage({ message: res.payload.msg, type: ERROR }));
        if (res && !res.error) resetForm();
      }}
    >
      {({ errors, touched }) => (
        <Form className={styles.formMainContainer}>
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
                className={styles.passwordError}
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
                className={styles.passwordError}
              >{`Error: ${errors.newPassword}`}</div>
            ) : null}
          </div>
          <div className={styles.inputContainer}>
            <label className={styles.labelInput}>confirm password</label>
            <Field
              name="confirmNewPassword"
              className={styles.input}
              type="password"
            />
            {errors.confirmNewPassword && touched.confirmNewPassword ? (
              <div
                className={styles.passwordError}
              >{`Error: ${errors.confirmNewPassword}`}</div>
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
  );
};
