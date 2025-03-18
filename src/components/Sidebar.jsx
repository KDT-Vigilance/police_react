import React from "react";
import styles from "./Sidebar.module.css";

const Sidebar = () => {
  const incidents = [
    "‘25.3.24 코리아아이티",
    "‘25.3.24 코리아아이티",
    "‘25.3.24 코리아아이티",
    "‘25.3.24 코리아아이티",
  ];

  return (
    <div className={styles.sidebar}>
      <h2 className={styles.title}>Vigilance</h2>
      <ul>
        {incidents.map((incident, index) => (
          <li key={index}>{incident}</li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
