import { Field, Form, Formik } from "formik";
import React  from "react";
import { UserSchema } from "../../../services/validationService";
import styles from "./User.module.css";
import { Panel } from "../../layout/Panel";
import { updateUserDetail } from "../../../redux/feature/extraReducers";
import { useDispatch, useSelector } from "react-redux";
import { SelectList } from "./SelectList";
import { UpdatePassword } from './UpdatePassword';
import { jobPositions } from "../../../constants";

export const User = () => {
  const dispatch = useDispatch();
  const user = useSelector(({ user }) => user);
  const details = useSelector(({ user }) => user.details);

  return (
    <Panel>
      <div className={styles.containerWrapper}>
        <div className={styles.container}>
          <Formik
            initialValues={{
              email: user.email,
              fullName: details ? details.fullName : '',
              schoolName: details ? details.schoolName : '',
              jobPosition: details ? details.jobPosition : null,
            }}
            validationSchema={UserSchema}
            enableReinitialize={true}
            onSubmit={(values) => {
              dispatch(updateUserDetail(values));
            }}
          >
            {({ errors, touched, setFieldValue, initialValues }) => (
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
                <div className={styles.inputContainer}>
                  <label className={styles.labelInput}>job position</label>
                  <SelectList
                    arrayList={ jobPositions }
                    change={(value) => { setFieldValue('jobPosition', value) }}
                    value={initialValues.jobPosition}
                    circle={false}
                    inputBig={false}
                  />
                </div>
                <div className={styles.btnBlock}>
                  <button type="submit" className={styles.btnSave}>
                    Save
                  </button>
                </div>
              </Form>
            )}
          </Formik>
          <UpdatePassword />
        </div>
      </div>
    </Panel>
  );
};
