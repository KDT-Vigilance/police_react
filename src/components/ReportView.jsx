import { useState, useEffect, useContext } from "react";
import styles from "./ReportView.module.css";
import { CommonContext } from "../App";

export default function ReportView() {
  const { selected_report, setSelectedReport } = useContext(CommonContext); // 🔹 selected_report & setSelectedReport 가져오기
  const [status, setStatus] = useState("0"); // 기본값: "확인 대기"

  // 🔹 selected_report가 변경될 때 title, videoSrc 자동 업데이트
  useEffect(() => {
    if (selected_report) {
      setStatus(selected_report.status?.toString() || "0"); // 🔹 선택된 신고의 상태값 동기화
    }
  }, [selected_report]); // 🔹 selected_report가 변경될 때 실행

  // 🔹 status 변경될 때마다 서버에 업데이트 요청
  useEffect(() => {
    if (!selected_report) return; // selected_report가 없으면 요청하지 않음

    const updateStatus = async () => {
      try {
        const response = await fetch(
          "http://localhost:9090/report/statusUpdate",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              reportId: selected_report._id, // 선택된 리포트 ID
              status: status, // 변경된 상태 값
            }),
          }
        );

        if (response.ok) {
          const updatedReport = await response.json(); // 🔹 응답을 JSON으로 변환
          setSelectedReport(updatedReport); // 🔹 상태 업데이트
          console.log("✅ 상태 업데이트 성공:", updatedReport);
        } else {
          console.error("🚨 상태 업데이트 실패:", response.statusText);
        }
      } catch (error) {
        console.error("📡 상태 업데이트 요청 중 오류 발생:", error);
      }
    };

    updateStatus();
  }, [status]); // 🔹 status 또는 selected_report가 변경될 때 실행

  return (
    <div className={styles.card}>
      <h2 className={styles.title}>
        {selected_report ? selected_report.title : "리포트 없음"}
      </h2>
      <div className={styles.videoContainer}>
        {selected_report?.videoSrc ? (
          <video className={styles.video} controls>
            <source src={selected_report.videoSrc} type="video/mp4" />
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
          <option value="0">확인 대기</option>
          <option value="1">확인 중</option>
          <option value="2">출동 중</option>
          <option value="3">조치 완료</option>
          <option value="4">이상 무</option>
        </select>
      </div>
    </div>
  );
}
