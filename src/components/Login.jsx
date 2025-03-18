import React, { useState } from "react";
import styles from "./Login.module.css";

const loginBox = () => {
  return (
    <div className={styles.login_container}>
      <h1 className={styles.title}>Vigilance</h1>
      <form className={styles.form}>
        <div className={styles.input_box}>
          <p className={styles.input_label}>ID</p>
          <input type="text" />
        </div>
        <div className={styles.input_box}>
          <p className={styles.input_label}>PW</p>
          <input type="text" />
        </div>

        <div className={styles.btn_container}>
          <button className={styles.btn_common}>로그인</button>
          <button className={styles.btn_common}>회원가입</button>
        </div>
      </form>
    </div>
  );
};

export default loginBox;
