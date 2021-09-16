import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { setPopupMessage } from "../../../redux/feature/reducer";
import styles from "./PopupMessage.module.css";
import { SUCCESS, ERROR } from "../../../constants";

export const PopupMessage = () => {
  const popupMessage = useSelector(({ popupMessage }) => popupMessage);
  const popupMessageType = useSelector(({ popupMessageType }) => popupMessageType);
  const popupMessageSize = useSelector(({ popupMessageSize }) => popupMessageSize);
  const [animation, setAnimation] = useState(0)

  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(setPopupMessage(null));
  };

  const renderAnimations = () => {
    return popupMessage ? setAnimation(1) : setAnimation(0)
  }

  useEffect(() => {
    renderAnimations();

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
            <div animation={animation} className={`${styles.Modal_Body} ${popupMessageSize ? styles[popupMessageSize] : null}`}>
              <div
                className={
                  popupMessageType === SUCCESS ?
                    styles.successMessage :
                    (popupMessageType === ERROR ? styles.errorMessage : null )
                }
              >
                <div dangerouslySetInnerHTML={{ __html: popupMessage }} />
              </div>
            </div>
          </div>)
          : null
        }
    </div>
  )
}
