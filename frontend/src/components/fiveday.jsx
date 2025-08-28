import React from "react";

function FiveDayForecast({ forecastData, currentData }) {
  if (!forecastData || !forecastData.list) return null;

  // Group 3-hourly forecast into daily (pick around 12:00 each day)
  const dailyData = [];
  const mapByDate = {};

  forecastData.list.forEach((entry) => {
    const date = new Date(entry.dt_txt).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });

    const hour = new Date(entry.dt_txt).getHours();

    // Pick entry near 12:00, otherwise fallback to first
    if (
      !mapByDate[date] ||
      Math.abs(hour - 12) <
        Math.abs(new Date(mapByDate[date].dt_txt).getHours() - 12)
    ) {
      mapByDate[date] = entry;
    }
  });

  Object.keys(mapByDate).forEach((d) => dailyData.push(mapByDate[d]));

  // Take only next 5 days
  let fiveDays = dailyData.slice(0, 5);

  // ✅ Replace first card with current weather
  if (currentData) {
    const today = {
      dt_txt: new Date().toISOString(),
      main: { temp: currentData.main.temp },
      weather: currentData.weather,
    };
    fiveDays[0] = today;
  }

  return (
    <div
      className="forecast-grid"
      style={{
        display: "flex",
        gap: "15px",
        flexWrap: "wrap",
        position: "relative", // ✅ ensures overlay elements can float above
        zIndex: 1, // ✅ cards won’t block history popup
      }}
    >
      {fiveDays.map((day, index) => (
        <div
          key={index}
          className="forecast-card"
          style={{
            padding: "15px",
            borderRadius: "10px",
            background: "skyblue",
            textAlign: "center",
            minWidth: "120px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
            color: "#003366",
            cursor: "pointer",
            transition: "transform 0.2s ease-in-out", // smooth animation
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <h4>
            {new Date(day.dt_txt).toLocaleDateString("en-US", {
              weekday: "short",
            })}
          </h4>
          <img
            src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
            alt={day.weather[0].description}
            style={{ width: "50px", height: "50px" }}
          />
          <p style={{ fontWeight: "bold", fontSize: "16px" }}>
            {Math.round(day.main.temp)}°C
          </p>
          <p style={{ fontSize: "12px", color: "#003366" }}>
            {day.weather[0].description}
          </p>
        </div>
      ))}
    </div>
  );
}

export default FiveDayForecast;
