import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Sidebar.module.css";
import { CommonContext } from "../App";

const Sidebar = ({ socket }) => {
  const navigate = useNavigate();
  const { my_report, setMyReport, selected_report, setSelectedReport } =
    useContext(CommonContext); // 🔹 Context 사용
  const [activeIndex, setActiveIndex] = useState(null); // 🔹 활성화된 리스트 인덱스
  const [componentKey, setComponentKey] = useState(0); // 🔹 리렌더링을 강제할 key

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
          const data = await response.json();
          setMyReport(data); // 🔹 받아온 데이터를 my_report 상태에 저장
        }
      } catch (error) {
        console.error("📡 리포트 가져오기 실패:", error);
      }
    };

    fetchReports(); // 최초 실행
    const interval = setInterval(fetchReports, 2000); // 🔹 2초마다 리포트 갱신

    return () => clearInterval(interval); // 컴포넌트 언마운트 시 인터벌 제거
  }, [setMyReport]);

  // ✅ my_report 변경 시 Sidebar 자체를 리렌더링하도록 강제
  useEffect(() => {
    console.log("🔄 Sidebar 리렌더링 트리거 (my_report 변경됨)");
    setComponentKey((prevKey) => prevKey + 1); // Sidebar 자체가 리렌더링되도록 key 변경
  }, [my_report]);

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
    <div key={componentKey} className={styles.sidebar}>
      {" "}
      {/* ✅ key 값 변경으로 리렌더링 */}
      <h2 className={styles.title}>Vigilance</h2>
      <ul>
        {my_report && my_report.length > 0 ? (
          my_report.map((report, index) => (
            <li
              key={index}
              className={index === activeIndex ? styles.active : ""}
              onClick={() => handleSelectReport(report, index)}
            >
              {report.content}
            </li>
          ))
        ) : (
          <li>📡 리포트 없음</li>
        )}
      </ul>
      <button onClick={handleLogout} className={styles.logoutButton}>
        로그아웃
      </button>
    </div>
  );
};

export default Sidebar;
