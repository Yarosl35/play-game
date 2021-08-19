import styles from "./layout.module.css";
import Logo from "./logo.svg";
import { Link } from "react-router-dom";

export const TopBar = () => {
  return (
    <div className={styles.topBar}>
      <img className={styles.logo} src={Logo} />
      <div className={styles.containerMenu}>
        <Link to="/leader-board">
          <p>leader-board</p>
        </Link>

        <Link to="/players">
          <p>players</p>
        </Link>

        <Link to="/login">
          <p>login</p>
        </Link>
        <Link to="/register">
          <p>register</p>
        </Link>

        <Link to="/room-list">
          <p>room-list</p>
        </Link>

        <Link to="/user">
          <p>user</p>
        </Link>
        <Link to="/reset/email">
          <p>reset/email</p>
        </Link>
        <Link to="/reset">
          <p>reset</p>
        </Link>
      </div>
    </div>
  );
};
