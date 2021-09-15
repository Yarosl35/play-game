import { useDispatch } from "react-redux";
import styles from "./LogoutConfirm.module.css";
import { setIsShowLogoutConfirm, logout } from '../../../redux/feature/reducer';
import { useHistory } from "react-router-dom";

export const LogoutConfirm = ({ setShowModal, selectedRoomId }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  function callLogout () {
    dispatch(logout());
    dispatch(setIsShowLogoutConfirm(false));
    history.push('/login');
  }

  return (
    <div>
      <div className={styles.Modal}>
        <div className={styles.Modal_Body}>
          <p className={styles.title}>Log out</p>
          <div className={styles.blockRemoveRoom}>
            <div className={styles.content}>
              <div>Do you want to log out?</div>
            </div>
            <div className={styles.btnContainer}>
              <button
                onClick={() => {
                  dispatch(setIsShowLogoutConfirm(false));
                }}
                className={styles.btn_cancel}
              >
                Cancel
              </button>
              <button
                className={styles.btn_remove}
                onClick={callLogout}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
