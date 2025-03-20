import "./App.css";
import React, { createContext, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./page/Home";
import SignUp from "./page/Signup";
import ReportList from "./page/ReportList";
import NotFound from "./page/NotFound"; // 404 페이지 추가

export const CommonContext = createContext(); // Context 생성

function App() {
  const [myReport, setMyReport] = useState([]); // 📌 myReport 상태 (기본값: 빈 배열)
  const [selectedReport, setSelectedReport] = useState(null); // 📌 선택한 report 상태 추가

  return (
    <CommonContext.Provider
      value={{ myReport, setMyReport, selectedReport, setSelectedReport }} // 📌 값 추가
    >
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/report" element={<ReportList />} />
          <Route path="*" element={<NotFound />} /> {/* 🔹 404 페이지 설정 */}
        </Routes>
      </Router>
    </CommonContext.Provider>
  );
}

export default App;
