import React, { useState, useEffect } from "react";
import styles from "./SignalBtn.module.css";

const ActionButton = () => {
  const [isDispatch, setIsDispatch] = useState(false);
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    let interval;
    if (isDispatch) {
      interval = setInterval(() => {
        setFlash((prev) => !prev);
      }, 1000);
    } else {
      setFlash(false);
    }

    return () => clearInterval(interval);
  }, [isDispatch]);

  return (
    <div className={styles.actionButtonContainer}>
      <button
        className={`${styles.actionButton} ${
          isDispatch && flash ? styles.flash : ""
        }`}
        onClick={() => setIsDispatch((prev) => !prev)}
      >
        {isDispatch ? "🚨 사건 발생" : "👍 안전"}
      </button>
    </div>
  );
};

export default ActionButton;
