import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Mainweather } from "./Mainweather";
import TodayHighlights from "./TodayHighlights";
import FiveDayForecast from "./fiveday";

const API_KEY = import.meta.env.VITE_API_KEY;

export const Home = () => {
  const [city, setCity] = useState("London");
  const [weatherData, setWeatherData] = useState(null);
  const [airQualityData, setAirQualityData] = useState(null);
  const [fiveDayForecast, setFiveDayForecast] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchWeatherData = async (location) => {
    try {
      const geoResponse = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
          location
        )}&limit=1&appid=${API_KEY}`
      );
      const geoData = await geoResponse.json();

      // ✅ Check if city exists
      if (!Array.isArray(geoData) || geoData.length === 0) {
        setErrorMessage("Location not found");
        setWeatherData(null);
        setAirQualityData(null);
        setFiveDayForecast(null);
        return;
      }

      const geo = geoData[0];
      if (!geo || !geo.lat || !geo.lon) {
        setErrorMessage("Location coordinates not found");
        setWeatherData(null);
        setAirQualityData(null);
        setFiveDayForecast(null);
        return;
      }

      const { lat, lon } = geo;
      setErrorMessage(""); // clear previous errors

      // ✅ Weather Data
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      );
      const weatherJson = await weatherResponse.json();
      setWeatherData(weatherJson);

      // ✅ Air Quality Data
      const airResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
      );
      const airJson = await airResponse.json();
      setAirQualityData(airJson);

      // ✅ 5-Day Forecast
      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      );
      const forecastJson = await forecastResponse.json();
      setFiveDayForecast(forecastJson);
    } catch (err) {
      console.error("Error fetching data:", err);
      setErrorMessage("Failed to fetch weather data. Please try again.");
    }
  };

  const handleSearch = (searchedCity) => setCity(searchedCity);

  useEffect(() => {
    fetchWeatherData(city);
  }, [city]);

  return (
    <div
      className="app"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        zIndex: 1,
        boxShadow:
          "0 0 40px rgba(255,255,255,0.2), 0 0 80px rgba(0,150,255,0.3), 0 0 120px rgba(0,200,255,0.2)",
      }}
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          objectFit: "cover",
          zIndex: -1,
        }}
      >
        <source src="/3.mp4" type="video/mp4" />
      </video>

      <Navbar onSearch={handleSearch} />

      <div className="content" style={{ flex: 1, padding: "20px" }}>
        {errorMessage && (
          <div
            style={{
              color: "white",
              backgroundColor: "rgba(255,0,0,0.5)",
              padding: "10px 20px",
              borderRadius: "8px",
              textAlign: "center",
              marginBottom: "20px",
              fontWeight: "600",
            }}
          >
            {errorMessage}
          </div>
        )}

        {weatherData && (
          <>
            <div className="top-section" style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
              <div className="main-weather" style={{ flex: "1 1 300px" }}>
                <Mainweather weatherData={weatherData} />
              </div>

              {fiveDayForecast?.list && (
                <div className="five-day-forecast" style={{ flex: "1 1 400px" }}>
                  <h3
                    style={{
                      color: "white",
                      marginBottom: "10px",
                      fontSize: "30px",
                      fontWeight: "600",
                      textShadow:
                        "0px 2px 4px rgba(0,0,0,0.6), 0 0 10px rgba(0,150,255,0.5)",
                    }}
                  >
                    5-Day Forecast
                  </h3>
                  <FiveDayForecast
                    forecastData={fiveDayForecast}
                    currentData={weatherData}
                  />
                </div>
              )}
            </div>

            <div className="today-highlights" style={{ marginTop: "20px" }}>
              <TodayHighlights
                weatherData={weatherData}
                airQualityData={airQualityData}
              />
            </div>
          </>
        )}
      </div>

      <footer className="mt-4 p-3 text-center text-white bg-dark border-top border-light mb-0">
        <p className="mb-0" style={{ fontSize: "14px" }}>
          © {new Date().getFullYear()} Weather App | Powered by{" "}
          <a
            href="https://openweathermap.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-info text-decoration-none"
          >
            OpenWeather
          </a>{" "}
          | Created By Soumyadipta Seal
        </p>
      </footer>
    </div>
  );
};
