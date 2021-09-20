import firstPlace from "./img/firstPlace.svg";
import secondPlace from "./img/secondPlace.svg";
import thirdPlace from "./img/thirdPlace.svg";
import title from "./img/title.svg";
import styles from "./FullScreen.module.css";

export const TopBarFullScreen = ({ schoolName }) => {
  return (
    <div className={styles.topWrapper}>
      <div className={styles.places}>
        <img className={styles.second} src={secondPlace} alt="second place" />

        <img className={styles.first} src={firstPlace} alt="first place" />
        <img className={styles.third} src={thirdPlace} alt="third place" />
      </div>
      <div className={styles.titleWrapper}>
        <img className={styles.titleContainer} src={title} alt="second place" />
        <p className={styles.title}>{schoolName} school</p>
      </div>
    </div>
  );
};
