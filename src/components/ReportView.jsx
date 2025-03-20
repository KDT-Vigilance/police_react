import { useState, useContext } from "react";
import styles from "./ReportView.module.css";
import { CommonContext } from "../App";

export default function ReportView() {
  const [status, setStatus] = useState("확인대기");
  const { my_report } = useContext(CommonContext); // 🔹 Context에서 데이터 가져오기

  return (
    <div className={styles.card}>
      <h2 className={styles.title}>
        {my_report?.length > 0 ? my_report[0].title : "리포트 없음"}
      </h2>
      <div className={styles.videoContainer}>
        {my_report?.length > 0 ? (
          <video className={styles.video} controls>
            <source src={my_report[0].videoSrc} type="video/mp4" />
            브라우저가 비디오 태그를 지원하지 않습니다.
          </video>
        ) : (
          <p>📡 비디오 없음</p>
        )}
      </div>
      <div className={styles.statusContainer}>
        <select
          className={styles.select}
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="확인대기">확인대기</option>
          <option value="출동중">출동중</option>
          <option value="조치완료">조치완료</option>
        </select>
      </div>
    </div>
  );
}
