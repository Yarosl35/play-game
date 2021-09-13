import styles from "./Switch.module.css";

export const Switch = ({ value, setValue, callback }) => {
  return (
    <div
      onClick={() => {
        if (typeof(setValue) === 'function') setValue((e) => !e);
        if (typeof(callback) === 'function') callback(!value);
      }}
      className={styles.switchOption}
    >
      <div
        className={value ? styles.switchBlockOn : styles.switchBlockOff}
      ></div>
    </div>
  );
};
