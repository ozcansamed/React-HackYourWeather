import React, { useState } from "react";
import City from "./City";
import SearchBar from "./SearchBar";

export default function Weather() {
  const [weather, setWeather] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [searchText, setSearchText] = useState("");

  const getWeather = async searchString => {
    try {
      setLoading(true);
      const resp = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchString}&appid=${process.env.REACT_APP_OPENWEATHERMAP_API_KEY}
    `
      );
      setLoading(true);
      if (!resp.ok) {
        throw new Error("Please insert a valid city name...");
      }
      const data = await resp.json();
      setError(false);
      setErrorMessage("");
      setWeather(data);
      console.log(data);
    } catch (error) {
      console.error(error);
      setWeather("");
      setError(true);
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  function handleFormSubmit(event) {
    event.preventDefault();
    getWeather(searchText);
  }

  function handleSearchInputChange(event) {
    setSearchText(event.target.value);
  }

  return (
    <>
      <SearchBar
        onHandleFormSubmit={handleFormSubmit}
        onHandleSearchInputChange={handleSearchInputChange}
      />
      {loading && (
        <>
          <p>Wait for it...</p>
          <img
            src='https://miro.medium.com/max/441/1*9EBHIOzhE1XfMYoKz1JcsQ.gif'
            alt='loading'
          />
        </>
      )}
      {weather.name && <City data={weather} />}
      {error && <p>Error occurred: {errorMessage}</p>}
    </>
  );
}
