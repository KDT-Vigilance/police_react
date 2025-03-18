import { useState } from "react";
import styles from "./ReportView.module.css";

export default function ReportView({ title, videoSrc }) {
  const [status, setStatus] = useState("확인대기");

  return (
    <div className={styles.card}>
      <h2 className={styles.title}>{title}</h2>
      <h2 className={styles.title}>상황 구분 : 폭행</h2>
      <video className={styles.video} controls>
        <source src={videoSrc} type="video/mp4" />
        브라우저가 비디오 태그를 지원하지 않습니다.
      </video>
      <div className={styles.statusContainer}>
        {/* <span className={styles.statusLabel}>현재 상태:</span> */}
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
