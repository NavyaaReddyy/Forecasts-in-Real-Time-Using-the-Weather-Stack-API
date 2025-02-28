import React, { useState } from "react";
import "./Weather.css";


const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const API_KEY = "1b5c5a3403e06a8e06c7548a95c1feb2"; // Replace with your WeatherStack API key

  const fetchWeather = async () => {
    if (!city) {
      setError("Please enter a city name.");
      return;
    }

    setError("");
    setWeather(null); // Clear the previous results

    try {
      const response = await fetch(
        `http://api.weatherstack.com/current?access_key=${API_KEY}&query=${city}`
      );
      const data = await response.json();

      if (data.error) {
        setError("City not found. Please try again.");
      } else {
        setWeather(data.current);
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>WeatherLogix</h1>
      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        style={{ padding: "10px", width: "200px" }}
      />
      <button onClick={fetchWeather} style={{ marginLeft: "10px", padding: "10px 20px" }}>
        Get Weather
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {weather && (
        <div style={{ marginTop: "20px" }}>
          <h2>Weather in {city}</h2>
          <p>Temperature: {weather.temperature}°C</p>
          <p>Condition: {weather.weather_descriptions[0]}</p>
          <img src={weather.weather_icons[0]} alt="Weather icon" />
        </div>
      )}
    </div>
  );
};

export default Weather;
