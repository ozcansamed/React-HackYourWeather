import React, { useState, createContext } from "react";
import City from "./City";
import SearchBar from "./SearchBar";
import CityDetail from "./CityDetail";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export const WeatherContext = createContext({});

export default function Weather() {
  const [weather, setWeather] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [searchText, setSearchText] = useState("");
  const [searchedCities, setSearchedCities] = useState([]);

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
      setWeather(data);
      setSearchedCities([data, ...searchedCities]);
      setError(false);
      setErrorMessage("");
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

  function deleteCity(id) {
    const cities = searchedCities.filter(city => city.id !== id);
    setSearchedCities(cities);
  }

  const enableInput = () => (searchText < 1 ? true : false);

  return (
    <Router>
      <div>
        <WeatherContext.Provider
          value={{ weather, setWeather, searchedCities, deleteCity }}
        >
          <SearchBar
            onHandleFormSubmit={handleFormSubmit}
            onHandleSearchInputChange={handleSearchInputChange}
            enableInput={enableInput}
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
          <Switch>
            <Route path='/:id'>
              <CityDetail />
            </Route>
            <Route path='/'>
              {weather.name && (
                <ul>
                  {searchedCities.map((data, index) => (
                    <li key={index}>
                      <City data={data} deleteCity={deleteCity} />
                    </li>
                  ))}
                </ul>
              )}
            </Route>
          </Switch>
          {error && <p>Error occurred: {errorMessage}</p>}
        </WeatherContext.Provider>
      </div>
    </Router>
  );
}
