import styles from "./layout.module.css";
import Logo from "./logo.svg";
import { Link } from "react-router-dom";

export const TopBar = () => {
  return (
    <div className={styles.topBar}>
      <Link to="/" style={{ textDecoration: "none" }}>
        <img className={styles.logo} src={Logo} />
      </Link>
      <div className={styles.containerMenu}>
        <div>
          <Link to="/play" style={{ textDecoration: "none" }}>
            Play
          </Link>
          <Link to="/about" style={{ textDecoration: "none" }}>
            About
          </Link>
          <Link to="resource" style={{ textDecoration: "none" }}>
            Resource
          </Link>
        </div>
        <Link to="/login">Login</Link>
        {/* <Link to="/leader-board">
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
        </Link> */}
      </div>
    </div>
  );
};
