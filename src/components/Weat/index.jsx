import { useState } from "react";
// import './App.css';
import seacrh_icon from "../../assets/search.png";
import humidity_icon from "../../assets/humidity.png";
import wind_icon from "../../assets/wind.png";
import cloud_icon from "../../assets/cloud.png";
import "./weat.css";

function Weat() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const linkHistorical =
    "http://api.weatherstack.com/historical?access_key=547e796e59c8b1ac0d4ac4e6c714b352&query=London&historical_date=2015-01-21&hourly=1";
  console.log(linkHistorical);

  const getHistoricalWeather = () => {
    fetch(
      `http://api.weatherstack.com/historical?access_key=547e796e59c8b1ac0d4ac4e6c714b352&query=London&historical_date=2015-01-21&hourly=1`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data.success === false) {
          console.error(data.error.info);
          alert(data.error.info);
        } else {
          console.log(data);
        }
      })
      .catch((error) => {
        console.error("Error fetching the historical weather data:", error);
      });
  };
  

  const getWeather = () => {
    if (city === "") {
      alert("Enter city name");
      return;
    }
    fetch(
      `http://api.weatherstack.com/current?access_key=547e796e59c8b1ac0d4ac4e6c714b352&query=${city}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data.success !== false) {
          setWeatherData(data);
          setErrorMessage("");
        } else {
          //   setWeatherData(null);
          alert("No weather data available.");
        }
      })
      .catch((error) => {
        console.error("Error fetching the weather data:", error);
        setErrorMessage("Error fetching the weather data.");
        alert("Failed to fetch data. Please try again later.");
      });
  };

  return (
    <div className="weather">
      <h1>Weather App</h1>
      <div className="weather-block">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <img
          src={seacrh_icon}
          alt="search"
          onClick={getWeather}
          style={{
            borderRadius: "50%",
            width: "50px",
            backgroundColor: "#ebfffc",
          }}
        />
        <button
          onClick={getHistoricalWeather}
          style={{
            width: "50px",
            backgroundColor: "#ebfffc",
            paddingTop: "20px",
            paddingBottom: "20px",
            borderRadius: "50%",
            fontSize: "12px",
            cursor: "pointer",
            border: 'none'
          }}
        >
          History
        </button>
      </div>
      <br />
      {weatherData && (
        <>
          <img
            src={weatherData.current.weather_icons[0]}
            alt="Weather Icon"
            id="image"
            style={{ borderRadius: "35px", width: "100px" }}
          />
          <div id="output">
            <h2 className="location" style={{ textAlign: "center" }}>
              {weatherData.location.name}
            </h2>
            <h4 style={{ textAlign: "center" }}>
              {weatherData.current.weather_descriptions[0]}
            </h4>
            <div className="weather-data">
              <div className="col">
                <p>
                  <img src={cloud_icon} alt="" />
                  Temperature: {weatherData.current.temperature} &deg;C
                </p>
                <p>
                  <img src={humidity_icon} alt="" />
                  Humidity: {weatherData.current.humidity} %
                </p>
              </div>
              <div className="col">
                <p>
                  <img src={cloud_icon} alt="" />
                  Cloud cover: {weatherData.current.cloudcover}
                </p>
                <p>
                  <img src={wind_icon} alt="" />
                  Wind Speed: {weatherData.current.wind_speed} km/h
                </p>
              </div>
            </div>
          </div>
        </>
      )}
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}

export default Weat;
