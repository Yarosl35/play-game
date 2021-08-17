import styles from "./Login.module.css";
import icon from "./iconUser.svg";

export const Login = () => {
  return (
    <div className={styles.bgContainer}>
      <div className={styles.iconUser}>
        <img src={icon} alt="icon" />
      </div>
      <div className={styles.containerLoginInput}>
        <label className={styles.labelInput}>email:</label>
        <input type="text" className={styles.formLogin} />
      </div>
      <div className={styles.containerPasswordInput}>
        <label className={styles.labelInput}>password:</label>
        <input type="text" className={styles.formLogin} />
      </div>
      <div className={styles.BtnBlock}>
        <button className={styles.BtnLogin}>Register</button>

        <button className={styles.BtnLogin}>Login</button>
      </div>
      <button className={styles.BtnReset}>Forget password</button>
    </div>
  );
};
