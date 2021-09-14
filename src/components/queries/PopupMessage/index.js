import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { setPopupMessage } from "../../../redux/feature/reducer";
import styles from "./PopupMessage.module.css";

export const PopupMessage = () => {
  const popupMessage = useSelector(({ popupMessage }) => popupMessage);
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(setPopupMessage(null));
  };

  useEffect(() => {
    let popupTimeout = setTimeout(function () {
      dispatch(setPopupMessage(null));
    }, 3000);
    return () => {
      clearTimeout(popupTimeout);
    }
  }, [dispatch, popupMessage]);

  return (
    <div>
        { popupMessage ?
          (<div className={styles.Modal} onClick={ closeModal }>
            <div className={styles.Modal_Body}>
              <div>{ popupMessage }</div>
            </div>
          </div>)
          : null
        }
    </div>
  )
}
