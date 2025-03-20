import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

const LoginBox = () => {
  const navigate = useNavigate();
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault(); // 기본 동작 방지

    const response = await fetch("http://localhost:9090/station/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ account, password }),
    });

    const data = await response.json();

    if (data.status) {
      alert("로그인 성공!");
      console.log("로그인 응답:", data);

      // 로그인 성공 후 필요한 데이터 저장
      localStorage.setItem("_id", data.data._id);
      localStorage.setItem("tel", data.data.tel);

      // 로그인 후 페이지 이동
      navigate("/report");
    } else {
      console.log("로그인 실패:", data);
      alert("로그인 실패!");
    }
  };

  return (
    <div className={styles.login_container}>
      <h1 className={styles.title}>Vigilance</h1>
      <form className={styles.form} onSubmit={handleLogin}>
        <div className={styles.input_box}>
          <p className={styles.input_label}>ID</p>
          <input
            type="text"
            id="account"
            name="account"
            value={account}
            onChange={(e) => setAccount(e.target.value)}
          />
        </div>
        <div className={styles.input_box}>
          <p className={styles.input_label}>PW</p>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className={styles.btn_container}>
          <button type="submit" className={styles.btn_common}>
            로그인
          </button>
          <button
            className={styles.btn_common}
            type="button"
            onClick={() => navigate("/signup")}
          >
            회원가입
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginBox;
