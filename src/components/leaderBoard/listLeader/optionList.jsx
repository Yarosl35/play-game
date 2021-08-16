import { useState } from "react";
import styles from "./leaderList.module.css";

export const OptionList = () => {
  const [value, setValue] = useState("");
  console.log(value);
  return (
    <label htmlFor="list">
      <input
        className={styles.select}
        id="list"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <p>room 1</p>
      <p>room 2</p>
      <p>room 3</p>
      <p>room 4</p>
    </label>
  );
};
