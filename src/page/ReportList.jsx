import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import Sidebar from "../components/Sidebar";
import ReportView from "../components/ReportView";
import { CommonContext } from "../App"; // 📌 올바른 파일 경로로 수정

const ReportList = () => {
  const navigate = useNavigate();
  const [socket, setSocket] = useState(null);
  const { myReport, setMyReport } = useContext(CommonContext); // 📌 commonContext에서 상태 가져오기

  useEffect(() => {
    const userId = localStorage.getItem("_id");
    const tel = localStorage.getItem("tel");

    if (!userId || !tel) {
      navigate("/");
      return;
    }

    const newSocket = io("http://localhost:9090", {
      transports: ["websocket"],
      query: { tel },
    });

    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("🔌 소켓 연결 성공! ID:", newSocket.id);
    });

    newSocket.on("message", (msg) => {
      console.log("📩 서버 메시지:", msg);
    });

    // 🔹 private_report 이벤트 수신 후 my_report 업데이트
    newSocket.on("private_report", async (data) => {
      alert("📥 받은 private_report:", data);

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
          setMyReport(result); // 📌 my_report 상태 업데이트
          console.log("✅ my_report 상태 업데이트 완료:", result);
        } else {
          console.error("🚨 my_report 업데이트 실패:", response.statusText);
        }
      } catch (error) {
        console.error("📡 리포트 가져오기 실패:", error);
      }
    });

    newSocket.on("disconnect", () => {
      console.log("❌ 소켓 연결 끊김");
    });

    return () => {
      newSocket.disconnect();
      console.log("🛑 소켓 연결 해제됨");
    };
  }, [navigate, setMyReport]);

  const containerStyle = {
    display: "flex",
    height: "100vh",
  };

  return (
    <div style={containerStyle}>
      <Sidebar socket={socket} />
      <ReportView /> {/* 📌 my_report를 VigilanceVideo에 전달 */}
    </div>
  );
};

export default ReportList;
