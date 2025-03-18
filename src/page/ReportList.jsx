import React from "react";
import Sidebar from "../components/Sidebar";
import VigilanceVideo from "../components/ReportView";
import SignalBtn from "../components/SignalBtn";

const ReportList = () => {
  const containerStyle = {
    display: "flex",
    height: "100vh",
  };

  return (
    <div style={containerStyle}>
      <Sidebar />
      <VigilanceVideo
        title="25.3.24 코리아아이티"
        videoSrc="your-video-url.mp4"
      />
    </div>
  );
};

export default ReportList;
