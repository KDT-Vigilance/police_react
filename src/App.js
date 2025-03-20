import "./App.css";
import React, { createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./page/Home";
import SignUp from "./page/Signup";
import ReportList from "./page/ReportList";
import NotFound from "./page/NotFound"; // 404 페이지 추가

export const CommonContext = createContext();

function App() {
  return (
    <CommonContext.Provider value={{}}>
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
