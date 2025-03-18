import React, { useState } from "react";
import styles from "./SignUp.module.css";

const loginBox = () => {
  return (
    <div className={styles.login_container}>
      <h1 className={styles.title}>Vigilance</h1>
      <form className={styles.form}>
        <div className={styles.x_container}>
          <p className={styles.x_content}>❌</p>
        </div>
        <div className={styles.input_box}>
          <p className={styles.input_label}>Station</p>
          <input type="text" placeholder="서울 강남 경찰서" />
        </div>
        <div className={styles.input_box}>
          <p className={styles.input_label}>Key</p>
          <input type="text" placeholder="경찰서 고유키 입력" />
        </div>
        <div className={styles.input_box}>
          <p className={styles.input_label}>TEL</p>
          <input type="number" placeholder="021321425" />
        </div>
        <div className={styles.input_box}>
          <p className={styles.input_label}>ID</p>
          <input type="text" placeholder="ID를 입력해주세요." />
        </div>
        <div className={styles.input_box}>
          <p className={styles.input_label}>PW</p>
          <input type="text" placeholder="8자리 이상의 암호를 입력해주세요." />
        </div>

        <div className={styles.btn_container}>
          <button className={styles.btn_common}>회원가입</button>
        </div>
      </form>
    </div>
  );
};

export default loginBox;
