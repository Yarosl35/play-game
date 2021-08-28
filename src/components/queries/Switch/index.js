import styles from "./Switch.module.css";

export const Switch = ({ value, setValue }) => {
  return (
    <div
      onClick={() => {
        setValue((e) => !e);
      }}
      className={styles.switchOption}
    >
      <div
        className={value ? styles.switchBlockOn : styles.switchBlockOff}
      ></div>
    </div>
  );
};
