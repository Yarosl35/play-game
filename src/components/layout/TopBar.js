import styles from "./layout.module.css";
import Logo from "./logo.svg";
import { Link } from "react-router-dom";

export const TopBar = () => {
  return (
    <div className={styles.topBar}>
      <Link to="/" style={{ textDecoration: "none" }}>
        <img className={styles.logo} src={Logo} alt="logo" />
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
      </div>
    </div>
  );
};
