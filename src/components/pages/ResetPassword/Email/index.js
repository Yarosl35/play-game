import styles from "./email.module.css";
import { Link } from "react-router-dom";
import mailIcon from "./mailDone.svg";
import { LoginLayout } from "../../../layout/LoginLayout";

export const EmailSend = () => {
  return (
    <LoginLayout>
      <div className={styles.containerWrapper}>
        <div className={styles.container}>
          <div className={styles.mainBlock}>
            <img className={styles.mainIcon} src={mailIcon} alt="mail done" />
            <p className={styles.mainBlockText}>
              Reset link has been sent to your email
            </p>
          </div>

          <Link to="/login">
            <button className={styles.btnMainPage}>Main page</button>
          </Link>
        </div>
      </div>
    </LoginLayout>
  );
};
