import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import Sidebar from "../components/Sidebar";
import VigilanceVideo from "../components/ReportView";

const ReportList = () => {
  const navigate = useNavigate();
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem("_id");
    const tel = localStorage.getItem("tel");

    // 🔹 _id와 tel이 없으면 '/'로 리디렉트
    if (!userId || !tel) {
      navigate("/");
      return;
    }

    // 🔹 소켓 연결
    const newSocket = io("http://localhost:9090", {
      transports: ["websocket"],
      query: { tel }, // 서버로 tel 정보 전달
    });

    setSocket(newSocket);

    // 🔹 소켓 이벤트 리스너 설정
    newSocket.on("connect", () => {
      console.log("🔌 소켓 연결 성공! ID:", newSocket.id);
    });

    newSocket.on("message", (msg) => {
      console.log("📩 서버 메시지:", msg);
    });

    newSocket.on("disconnect", () => {
      console.log("❌ 소켓 연결 끊김");
    });

    // 컴포넌트 언마운트 시 소켓 연결 해제
    return () => {
      newSocket.disconnect();
      console.log("🛑 소켓 연결 해제됨");
    };
  }, [navigate]);

  const containerStyle = {
    display: "flex",
    height: "100vh",
  };

  return (
    <div style={containerStyle}>
      <Sidebar socket={socket} />{" "}
      {/* Sidebar에서 소켓 사용 가능하도록 props 전달 */}
      <VigilanceVideo />
    </div>
  );
};

export default ReportList;
