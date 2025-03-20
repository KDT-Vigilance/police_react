import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./SignUp.module.css";

const SignUpBox = () => {
  const navigate = useNavigate();

  // 입력값 상태 관리
  const [formData, setFormData] = useState({
    station_name: "",
    station_key: "",
    general_key: "",
    tel: "",
    account: "",
    password: "",
  });

  // 입력값 변경 핸들러
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 회원가입 요청
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:9090/station/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.status) {
        alert("회원가입이 완료되었습니다.");
        navigate("/"); // 로그인 페이지로 이동
      } else {
        alert(result.message || "회원가입에 실패했습니다.");
      }
    } catch (error) {
      console.error("회원가입 오류:", error);
      alert("회원가입 오류가 발생했습니다.");
    }
  };

  return (
    <div className={styles.login_container}>
      <h1 className={styles.title}>Vigilance</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.x_container}>
          <Link to="/" className={styles.x_content}>
            ❌
          </Link>
        </div>

        <div className={styles.input_box}>
          <p className={styles.input_label}>Station</p>
          <input
            type="text"
            name="station_name"
            placeholder="서울 강남 경찰서"
            value={formData.station_name}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.input_box}>
          <p className={styles.input_label}>Key</p>
          <input
            type="text"
            name="station_key"
            placeholder="경찰서 고유키 입력"
            value={formData.station_key}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.input_box}>
          <p className={styles.input_label}>General</p>
          <input
            type="text"
            name="general_key"
            placeholder="총괄자 고유키 입력"
            value={formData.general_key}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.input_box}>
          <p className={styles.input_label}>TEL</p>
          <input
            type="number"
            name="tel"
            placeholder="경찰서 신고번호를 입력해주세요"
            value={formData.tel}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.input_box}>
          <p className={styles.input_label}>ID</p>
          <input
            type="text"
            name="account"
            placeholder="ID를 입력해주세요."
            value={formData.account}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.input_box}>
          <p className={styles.input_label}>PW</p>
          <input
            type="password"
            name="password"
            placeholder="8자리 이상의 암호를 입력해주세요."
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.btn_container}>
          <button className={styles.btn_common} type="submit">
            회원가입
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUpBox;
