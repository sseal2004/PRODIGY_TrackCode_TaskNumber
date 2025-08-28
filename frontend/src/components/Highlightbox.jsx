import React, { useState, useEffect } from "react";

const HighlightBox = ({ title, value, Icon }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #00e5ff, #4a00e0)",
        color: "#fff",
        padding: isMobile ? "1rem" : "1.5rem",
        borderRadius: "1rem",
        flex: isMobile ? "1 1 100%" : "1 1 260px",
        minWidth: isMobile ? "unset" : "220px",
        width: isMobile ? "100%" : "auto",
        height: isMobile ? "auto" : "140px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-5px)";
        e.currentTarget.style.boxShadow = "0 15px 35px rgba(0,0,0,0.4)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.3)";
      }}
    >
      <div
        style={{
          fontSize: isMobile ? "16px" : "20px",
          marginBottom: "10px",
          fontWeight: "600",
          textShadow: "0 2px 6px rgba(0,0,0,0.3)",
        }}
      >
        {title}
      </div>

      <Icon
        style={{
          fontSize: isMobile ? "36px" : "48px",
          marginBottom: "8px",
          color: "#FFD700",
          filter: "drop-shadow(0 0 5px rgba(255,255,255,0.7))",
        }}
      />

      <div
        style={{
          fontSize: isMobile ? "20px" : "26px",
          fontWeight: "700",
          textShadow: "0 1px 4px rgba(0,0,0,0.5)",
        }}
      >
        {value}
      </div>
    </div>
  );
};

export default HighlightBox;
