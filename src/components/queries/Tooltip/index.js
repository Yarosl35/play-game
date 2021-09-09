import { useState } from "react";
import styles from "./Tooltip.module.css";
import tooltipIcon from "./tooltip.svg";
import lightTooltipIcon from "./lightTooltip.svg";

export const Tooltip = ({ isLight = false }) => {
  const [tooltipShow, setTooltipShow] = useState(false);
  return (
    <>
      <div className={styles.mainContainer}>
        <img
          className={[styles.logo, isLight ? styles.isLightLogo : null]}
          src={isLight ? lightTooltipIcon : tooltipIcon}
          alt="tooltip"
          onMouseOver={() => setTooltipShow(true)}
          onMouseOut={() => setTooltipShow(false)}
        />
        {tooltipShow ? (
          <div className={styles.block}>
            Password must be formed with 8 characters including big and small
            letters and numbers
          </div>
        ) : null}
      </div>
    </>
  );
};
