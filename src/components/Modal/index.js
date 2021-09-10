import styles from "./Modal.module.css";

export const Modal = ({ response }) => {
  return (
    <div className={styles.Modal}>
      <div className={styles.Modal_Body}>
        <p>{response}</p>
      </div>
    </div>
  );
};
