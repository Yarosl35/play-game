import { useDispatch } from "react-redux";
import { removeRoomEmit } from "../../../../redux/feature/extraReducers";
import styles from "./RemoveRoomConfirm.module.css";

export const RemoveRoomConfirm = ({ setShowModal, selectedRoomId }) => {
  const dispatch = useDispatch();

  function removeRoom() {
    if (selectedRoomId) dispatch(removeRoomEmit(selectedRoomId));
    setShowModal(false);
  }

  return (
    <div className={styles.Modal}>
      <div className={styles.Modal_Body}>
        <p className={styles.title}>Remove Room</p>
        <div className={styles.blockRemoveRoom}>
          <div className={styles.content}>
            <div>Are you sure you are going to remove the room?</div>
            <div>This cannot be undo.</div>
          </div>
          <div className={styles.btnContainer}>
            <button
              onClick={() => {
                setShowModal(false);
              }}
              className={styles.btn_cancel}
            >
              Cancel
            </button>
            <button
              className={styles.btn_remove}
              onClick={removeRoom}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
