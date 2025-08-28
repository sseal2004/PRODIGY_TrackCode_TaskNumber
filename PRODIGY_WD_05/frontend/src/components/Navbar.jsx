import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import FilterDramaIcon from '@mui/icons-material/FilterDrama';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import LogoutIcon from '@mui/icons-material/Logout';

const Navbar = ({ onSearch }) => {
  const [searchCity, setSearchCity] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();
const API_KEY = import.meta.env.VITE_API_KEY;

  const handleSearchClick = () => {
    if (searchCity.trim()) {
      onSearch(searchCity);
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setSearchCity(value);

    if (value.trim()) {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=5&appid=${API_KEY}`
        );
        const data = await response.json();

        if (Array.isArray(data)) {
          const cityNames = data.map(
            (city) =>
              `${city.name}${city.state ? ", " + city.state : ""}, ${city.country}`
          );
          setSuggestions(cityNames);
          setShowSuggestions(true);
        }
      } catch (error) {
        console.error("Error fetching city suggestions:", error);
      }
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSelectSuggestion = (city) => {
    setSearchCity(city);
    onSearch(city);
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    sessionStorage.clear();
    navigate("/login");
  };

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await fetch(
              `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${API_KEY}`
            );
            const data = await response.json();
            if (data && data.length > 0) {
              let city = data[0].name || "";
              const country = data[0].country || "";
              if (city.includes("-")) city = city.split("-")[0].trim();
              const cityName = `${city}, ${country}`;
              setSearchCity(cityName);
              onSearch(cityName);
            }
          } catch (error) {
            console.error("Error fetching city from coordinates:", error);
          }
        },
        (error) => {
          alert("Failed to get location. Please enable location services.");
          console.error("Geolocation error:", error);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  // ✅ Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark shadow-sm p-3 mb-3 rounded"
      style={{ background: "rgba(0, 0, 0, 0.5)", backdropFilter: "blur(12px)" }}
    >
      <div className="d-flex align-items-center">
        <FilterDramaIcon fontSize="large" className="me-2" />
        <span className="navbar-brand fw-bold fs-4 mb-0">Weather</span>
      </div>

      <div className="d-flex flex-column position-relative mx-lg-3 flex-grow-1" ref={searchRef}>
        <div className="d-flex w-100 gap-2 justify-content-center">
          <div style={{ position: "relative", width: "60%", maxWidth: "30rem" }}>
            <div style={{ display: "flex", gap: "8px" }}>
              <TextField
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.85)",
                  borderRadius: "2rem",
                  flex: 1,
                  minWidth: "200px",
                  width: "100%",
                }}
                variant="outlined"
                placeholder="Search City"
                size="small"
                value={searchCity}
                onFocus={() => searchCity.trim() && setShowSuggestions(true)}
                onChange={handleInputChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleSearchClick();
                  }
                }}
              />
              <Button
                variant="contained"
                onClick={handleSearchClick}
                className="btn btn-dark"
                style={{ borderRadius: '6px' }}
              >
                Search
              </Button>
            </div>

            {showSuggestions && suggestions.length > 0 && (
              <ul
                className="list-group position-absolute"
                style={{
                  top: "45px",
                  left: "0",
                  zIndex: 2000,
                  width: "100%",
                  backgroundColor: "white",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                }}
              >
                {suggestions.map((city, index) => (
                  <li
                    key={index}
                    className="list-group-item list-group-item-action"
                    style={{ cursor: 'pointer', fontSize: '14px' }}
                    onClick={() => handleSelectSuggestion(city)}
                    onMouseDown={(e) => e.preventDefault()}
                  >
                    {city}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      <div className="d-flex flex-row flex-lg-row align-items-center gap-2 mt-3 mt-lg-0">
        <Button
          variant="contained"
          color="secondary"
          startIcon={<GpsFixedIcon />}
          onClick={handleCurrentLocation}
          className="text-white rounded-2 h-90 w-60 w-sm-auto btn-responsive-font text-nowrap"
          style={{ borderRadius: '6px', height: '35px', minWidth: '140px', backgroundColor: '#4B5550' }}
        >
          Your Location
        </Button>

        <Button
          variant="contained"
          color="danger"
          startIcon={<LogoutIcon />}
          onClick={handleLogout}
          className="text-white"
          style={{ borderRadius: '6px', height: '35px', minWidth: '100px', backgroundColor: '#e53e3e' }}
        >
          Logout
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
