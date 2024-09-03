import { Oval } from "react-loader-spinner";
import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function GfGWeatherApp() {
  const [input, setInput] = useState("");
  const [weather, setWeather] = useState({
    loading: false,
    data: {},
    error: false,
  });
  const [theme, setTheme] = useState("light");

  const toDateFunction = () => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const WeekDays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const currentDate = new Date();
    const date = `${WeekDays[currentDate.getDay()]} ${currentDate.getDate()} ${
      months[currentDate.getMonth()]
    }`;
    return date;
  };

  const search = async (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setInput("");
      setWeather({ ...weather, loading: true });
      const url = "https://api.openweathermap.org/data/2.5/weather";
      const api_key = "f00c38e0279b7bc85480c3fe775d518c";
      await axios
        .get(url, {
          params: {
            q: input,
            units: "metric",
            appid: api_key,
          },
        })
        .then((res) => {
          setWeather({ data: res.data, loading: false, error: false });
        })
        .catch((error) => {
          setWeather({ ...weather, data: {}, error: true });
          setInput("");
        });
    }
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
    document.documentElement.setAttribute(
      "data-theme",
      theme === "light" ? "dark" : "light"
    );
  };

  return (
    <div
      className={`App bg-white dark:bg-gray-800 p-5 rounded-lg shadow-lg max-w-lg mx-auto`}
    >
      <label className="theme-switch relative inline-block w-14 h-7 mb-4">
        <input
          type="checkbox"
          onChange={toggleTheme}
          className="opacity-0 w-0 h-0"
        />
        <span className="slider absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-gray-300 dark:bg-gray-600 transition-colors duration-300 rounded-full"></span>
        <span
          className={`absolute h-6 w-6 left-1 bottom-1 bg-white dark:bg-gray-800 transition-transform duration-300 rounded-full transform ${
            theme === "dark" ? "translate-x-7" : ""
          }`}
        ></span>
      </label>
      <h1 className="app-name text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6 animate__animated animate__fadeIn">
        Weather App
      </h1>
      <div className="search-bar">
        <input
          type="text"
          className="city-search w-full max-w-md border-2 border-gray-300 dark:border-gray-600 rounded-full py-3 px-5 focus:outline-none focus:border-blue-500 dark:focus:border-orange-500 transition-transform duration-300"
          placeholder="Enter City Name.."
          name="query"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyPress={search}
        />
      </div>
      {weather.loading && (
        <>
          <br />
          <br />
          <Oval type="Oval" color="black" height={100} width={100} />
        </>
      )}
      {weather.error && (
        <>
          <br />
          <br />
          <span className="error-message text-red-600 dark:text-red-400">
            City not found
          </span>
        </>
      )}
      {weather && weather.data && weather.data.main && (
        <div>
          <div className="city-name text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            <h2>
              {weather.data.name},{" "}
              <span className="text-lg font-medium">
                {weather.data.sys.country}
              </span>
            </h2>
          </div>
          <div className="date text-lg font-medium text-gray-700 dark:text-gray-400">
            <span>{toDateFunction()}</span>
          </div>
          <div className="icon-temp text-5xl font-bold text-gray-900 dark:text-gray-100 mt-4">
            <img
              className="mx-auto w-24 h-24 rounded-full shadow-lg animate__animated animate__bounce"
              src={`https://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`}
              alt={weather.data.weather[0].description}
            />
            {Math.round(weather.data.main.temp)}
            <sup className="deg text-xl">°C</sup>
          </div>
          <div className="des-wind text-gray-700 dark:text-gray-400 mt-4">
            <p>{weather.data.weather[0].description.toUpperCase()}</p>
            <p>Wind Speed: {weather.data.wind.speed}m/s</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default GfGWeatherApp;
