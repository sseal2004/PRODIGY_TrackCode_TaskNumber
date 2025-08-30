import WbSunnyIcon from "@mui/icons-material/WbSunny";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import CloudIcon from "@mui/icons-material/Cloud";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"; 
import LocationOnIcon from "@mui/icons-material/LocationOn"; 
import React from "react";

export const Mainweather = ({ weatherData }) => {
  const temperatureCelsius = weatherData?.main?.temp ?? null;
  const rawDescription = weatherData?.weather?.[0]?.description || "N/A";
  const cityName = weatherData?.name || "City not available";
  const countryName = weatherData?.sys?.country || "Country not available";
  const timestamp = weatherData?.dt || null;

  const currentDate = timestamp
    ? new Date(timestamp * 1000).toLocaleDateString("en-US", {
        weekday: "long",
        day: "numeric",
        month: "short",
      })
    : "Date not available";

  const weatherDescription =
    rawDescription !== "N/A"
      ? rawDescription
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")
      : "N/A";

  const renderTemperatureIcon = () => {
    if (temperatureCelsius === null)
      return <CloudIcon style={{ marginLeft: "10px", fontSize: "2.5rem", color: "gray" }} />;

    const temp = parseFloat(temperatureCelsius);
    if (isNaN(temp)) {
      return <CloudIcon style={{ marginLeft: "10px", fontSize: "2.5rem", color: "gray" }} />;
    }

    if (temp >= 30) {
      return <WbSunnyIcon style={{ marginLeft: "10px", fontSize: "2.5rem", color: "orangered" }} />;
    } else if (temp >= 20) {
      return <WbSunnyIcon style={{ marginLeft: "10px", fontSize: "2.5rem", color: "orange" }} />;
    } else if (temp >= 10) {
      return <CloudIcon style={{ marginLeft: "10px", fontSize: "2.5rem", color: "white" }} />;
    } else {
      return <AcUnitIcon style={{ marginLeft: "10px", fontSize: "2.5rem", color: "skyblue" }} />;
    }
  };

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #4A00E0, #8E2DE2, #FF4E50)",
        backgroundSize: "400% 400%",
        animation: "gradientBG 15s ease infinite",
        color: "white",
        borderRadius: "1.5rem",
        width: "240px",
        padding: "24px",
        boxShadow: "0 12px 30px rgba(0,0,0,0.3)",
        fontFamily: "'Poppins', sans-serif",
        letterSpacing: "0.5px",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        border: "1px solid rgba(255,255,255,0.2)",
        transition: "all 0.3s ease",
        cursor: "pointer",
        transform: "translateY(0)",
      }}
    >
      <style>
        {`
          @keyframes gradientBG {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>

      <div style={{ fontSize: "20px", marginBottom: "12px", fontWeight: "600" }}>Now</div>

      <div style={{ display: "flex", alignItems: "center", fontSize: "38px", fontWeight: "bold" }}>
        {temperatureCelsius !== null ? `${Math.round(temperatureCelsius)}°C` : "N/A"}
        {renderTemperatureIcon()}
      </div>

      <div 
        style={{ 
          marginTop: "12px", 
          fontSize: "15px", 
          fontWeight: "500", 
          display: "flex", 
          alignItems: "center", 
          gap: "6px" 
        }}
      >
        <LocationOnIcon fontSize="small" />
        {cityName}, {countryName}
      </div>

      <div
        style={{
          marginTop: "6px",
          fontSize: "14px",
          fontStyle: "italic",
          color: "rgba(255,255,255,0.85)",
        }}
      >
        {weatherDescription}
      </div>

      <div
        style={{
          fontSize: "13px",
          color: "rgba(255,255,255,0.7)",
          marginTop: "10px",
          display: "flex",
          alignItems: "center",
          gap: "6px",
        }}
      >
        <CalendarMonthIcon fontSize="small" />
        {currentDate}
      </div>
    </div>
  );
};
