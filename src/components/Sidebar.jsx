import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Sidebar.module.css";
import { CommonContext } from "../App";

const Sidebar = ({ socket }) => {
  const navigate = useNavigate();
  const { myReport, setMyReport, selectedReport, setSelectedReport } =
    useContext(CommonContext); // 🔹 Context 사용
  const [activeIndex, setActiveIndex] = useState(null); // 🔹 활성화된 리스트 인덱스
  const [isLoading, setIsLoading] = useState(true); // 🔹 최초 로딩 상태 관리

  // ✅ 최초 랜더링 시 한 번만 fetch 요청 실행
  useEffect(() => {
    const fetchReports = async () => {
      const tel = localStorage.getItem("tel");
      if (!tel) return;

      try {
        const response = await fetch("http://localhost:9090/report/myReport", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ tel }),
        });

        if (response.ok) {
          const result = await response.json();
          setMyReport(result.data); // 📌 myReport 상태 업데이트
          console.log("✅ 최초 로드된 myReport:", result.data);
        } else {
          console.error("🚨 myReport 업데이트 실패:", response.statusText);
        }
      } catch (error) {
        console.error("📡 리포트 가져오기 실패:", error);
      } finally {
        setIsLoading(false); // 🔹 로딩 완료 후 상태 업데이트
      }
    };

    fetchReports(); // 🔹 최초 실행
  }, [setMyReport]); // ✅ 최초 한 번만 실행

  const handleLogout = () => {
    localStorage.removeItem("_id");
    localStorage.removeItem("tel");

    if (socket) {
      socket.disconnect();
      console.log("🔴 소켓 연결 해제됨");
    }

    navigate("/");
  };

  const handleSelectReport = (report, index) => {
    setSelectedReport(report);
    setActiveIndex(index);
  };

  return (
    <div className={styles.sidebar}>
      <h2 className={styles.title}>Vigilance</h2>

      {isLoading ? ( // ✅ 로딩 중이면 표시
        <ul>
          <li className={styles.sidebar_li}>⏳ 리포트 불러오는 중...</li>
        </ul>
      ) : (
        <ul>
          {myReport && myReport.length > 0 ? (
            myReport.map((report, index) => {
              const formattedDate = report.createdAt
                ? new Date(report.createdAt).toISOString().split("T")[0]
                : "날짜 없음";
              return (
                <li
                  key={index}
                  className={`${styles.sidebar_li} ${
                    index === activeIndex ? styles.active : ""
                  }`}
                  onClick={() => handleSelectReport(report, index)}
                >
                  📅 {formattedDate} | 📷{" "}
                  {report.cam_name || "카메라 이름 없음"}
                </li>
              );
            })
          ) : (
            <li className={styles.sidebar_li}>📡 리포트 없음</li>
          )}
        </ul>
      )}

      <button onClick={handleLogout} className={styles.logoutButton}>
        로그아웃
      </button>
    </div>
  );
};

export default Sidebar;
