import { useEffect, useState } from "react";
import AirIcon from "@mui/icons-material/Air";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import InvertColorsIcon from "@mui/icons-material/InvertColors";
import HighlightBox from "../../src/components/Highlightbox";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CompressIcon from "@mui/icons-material/Compress";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";
import "../assets/TodayHighlights.css";

const TodayHighlights = ({ weatherData }) => {
  const [airQualityData, setAirQualityData] = useState(null);

const API_KEY = import.meta.env.VITE_API_KEY;

  const lat = weatherData?.coord?.lat;
  const lon = weatherData?.coord?.lon;
  const { main, visibility, sys } = weatherData || {};

  useEffect(() => {
    const fetchAirQuality = async () => {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
        );
        const data = await res.json();
        setAirQualityData(data);
      } catch (err) {
        console.error("Error fetching Air Quality:", err);
      }
    };
    if (lat && lon) fetchAirQuality();
  }, [lat, lon]);

  const getAQIDescription = (aqi) => {
    switch (aqi) {
      case 1:
        return { text: "Good", color: "#00C853" };
      case 2:
        return { text: "Fair", color: "#64DD17" };
      case 3:
        return { text: "Moderate", color: "#FFD600" };
      case 4:
        return { text: "Poor", color: "#FF6D00" };
      case 5:
        return { text: "Very Poor", color: "#D50000" };
      default:
        return { text: "Unknown", color: "#9E9E9E" };
    }
  };

  const aqiValue = airQualityData?.list?.[0]?.main?.aqi;
  const airDesc = getAQIDescription(aqiValue);

  const highlights = [
    { title: "Humidity", value: `${main?.humidity}%`, Icon: InvertColorsIcon },
    { title: "Pressure", value: `${main?.pressure} hPa`, Icon: CompressIcon },
    {
      title: "Visibility",
      value: `${(visibility / 1000).toFixed(1)} km`,
      Icon: VisibilityIcon,
    },
    {
      title: "Feels Like",
      value: `${main?.feels_like}°C`,
      Icon: DeviceThermostatIcon,
    },
  ];

  return (
    <div className="container my-5">
      {/* Heading */}
      <h2
        className="text-center fw-bold mb-5"
        style={{
  fontSize: "3.5rem",
  background: "linear-gradient(90deg, #FF4E50, #1E90FF)", // rose to blue
  backgroundClip: "text",
  WebkitBackgroundClip: "text",

  animation: "gradientAnimation 5s ease infinite",
  textShadow: `
    2px 2px 6px rgba(0,0,0,0.7),
    4px 4px 12px rgba(255,78,80,0.5),
    0 0 25px rgba(30,144,255,0.5)
  `,
  fontFamily: "'Poppins', sans-serif",
  letterSpacing: "2px",
}}

      >
        Today's Highlights
      </h2>

      {/* Top Row */}
      <div className="row g-4">
        {/* Air Quality */}
        <div className="col-md-6">
          <div className="card shadow-lg rounded-4 p-4 h-100 text-center" style={{ background: "linear-gradient(145deg, #345678, #00E5FF)", color: "#fff" }}>
            <h5 className="fw-bold mb-3" style={{ fontFamily: "'Poppins', sans-serif", color: "#FFD700" }}>Air Quality Index</h5>
            {airDesc && (
              <span
                className="badge px-3 py-2 mb-3"
                style={{ backgroundColor: airDesc.color, fontWeight: "bold", fontSize: "1.5rem" }}
              >
                {airDesc.text}
              </span>
            )}
            <AirIcon className="mb-3" style={{ fontSize: "40px", color: "white" }} />
            {airQualityData && (
              <div className="text-start" style={{ fontSize: "1.5rem" }}>
                <p><strong>CO:</strong> {airQualityData.list[0].components.co} μg/m³</p>
                <p><strong>NO:</strong> {airQualityData.list[0].components.no} μg/m³</p>
                <p><strong>NO₂:</strong> {airQualityData.list[0].components.no2} μg/m³</p>
                <p><strong>O₃:</strong> {airQualityData.list[0].components.o3} μg/m³</p>
              </div>
            )}
          </div>
        </div>

        {/* Sunrise & Sunset */}
        <div className="col-md-6">
          <div className="card shadow-lg rounded-4 p-4 h-100 text-center" style={{ background: "linear-gradient(145deg, #345678, #00E5FF)", color: "#fff" }}>
            <h5 className="fw-bold mb-3" style={{ fontFamily: "'Poppins', sans-serif", color: "#FFD700" }}>Sunrise and Sunset
</h5>
            <div className="d-flex justify-content-around align-items-center">
              <div style={{ fontSize: "1.5rem" }}>
                <WbSunnyIcon className="me-2" style={{ color: "#FFD700" }} />{" "}
                {sys &&
                  new Date(sys.sunrise * 1000).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
              </div>
              <div style={{ fontSize: "1.5rem" }}>
                <NightsStayIcon className="me-2" style={{ color: "#FF8C00" }} />{" "}
                {sys &&
                  new Date(sys.sunset * 1000).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="row g-4 mt-4">
        {highlights.map((highlight, index) => (
          <div key={index} className="col-md-3 col-sm-6">
            <HighlightBox
              title={highlight.title}
              value={highlight.value}
              Icon={highlight.Icon}
              style={{
              background: "linear-gradient(135deg, #00E5FF, #4A00E0, #00E5FF, #7F00FF)", 
                color: "#fff",
                borderRadius: "12px",
                fontFamily: "'Poppins', sans-serif",
                boxShadow: "0 8px 20px rgba(0,0,0,0.3)"
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodayHighlights;
