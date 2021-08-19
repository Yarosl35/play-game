import styles from "./email.module.css";
import { Link } from "react-router-dom";
import mailIcon from "./mailDone.svg"

export const EmailSend = () => {
  return (
    <div className={styles.containerWrapper}>
      <div className={styles.container}>

        <div className={styles.mainBlock}>
          <img className={styles.mainIcon} src={mailIcon} />
          <p className={styles.mainBlockText}>Reset link has been sent to your email</p>
        </div>
        
        <Link to="/">
          <button className={styles.btnMainPage}>Main page</button>
        </Link>
      </div>
    </div>
  );
};
