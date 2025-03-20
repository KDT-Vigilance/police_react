import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Login from "../components/Login.jsx";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("_id");

    if (userId) {
      navigate("/report"); // 🚀 로그인 상태라면 '/report' 페이지로 이동
    }
  }, [navigate]);

  return <Login />; // 🚀 로그인 안 되어 있으면 로그인 페이지 렌더링
};

export default Home;
