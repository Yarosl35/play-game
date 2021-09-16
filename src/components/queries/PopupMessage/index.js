import { useDispatch, useSelector } from "react-redux";
import React, {useCallback, useEffect, useState} from "react";
import { setPopupMessage } from "../../../redux/feature/reducer";
import styles from "./PopupMessage.module.css";
import { SUCCESS, ERROR } from "../../../constants";

export const PopupMessage = () => {
  const popupMessage = useSelector(({ popupMessage }) => popupMessage);
  const [animation, setAnimation] = useState(0)

  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(setPopupMessage(null));
  };

  const renderAnimations = useCallback(() => {
    return popupMessage.message ? setAnimation(1) : setAnimation(0)
  }, [popupMessage.message, setAnimation]);

  useEffect(() => {
    renderAnimations();
    if (!popupMessage.keep_alive) {
      var popupTimeout = setTimeout(function () {
        dispatch(setPopupMessage(null));
      }, 3000);
    }

    return () => {
      if (!popupMessage.keep_alive) clearTimeout(popupTimeout);
    }
  }, [dispatch, renderAnimations, popupMessage.keep_alive]);

  return (
    <div>
        { popupMessage.message ?
          (<div className={styles.Modal} onClick={ closeModal }>
            <div animation={animation} className={`${styles.Modal_Body} ${popupMessage.size ? styles[popupMessage.size] : null}`}>
              <div
                className={
                  popupMessage.type === SUCCESS ?
                    styles.successMessage :
                    (popupMessage.type === ERROR ? styles.errorMessage : null )
                }
              >
                <div dangerouslySetInnerHTML={{ __html: popupMessage.message }} />
              </div>
            </div>
          </div>)
          : null
        }
    </div>
  )
}
