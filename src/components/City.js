import React, { useContext } from "react";
import { WeatherContext } from "./Weather";
import { Link } from "react-router-dom";
import "./City.css";

export default function City({ data }) {
  const { deleteCity } = useContext(WeatherContext);
  return (
    <div className='city'>
      <button className='deleteButton' onClick={() => deleteCity(data.id)}>
        X
      </button>
      <Link to={`/${data.id}`}>
        <p style={{ marginBottom: "5px" }}>5 day forecast</p>
      </Link>
      <h1>
        {data.name}, {data.sys.country}
      </h1>
      <h3>{data.weather[0].main}</h3>
      <h4>{data.weather[0].description}</h4>
      <p>{`min temp: ${data.main.temp_min}`}</p>
      <p>{`max temp: ${data.main.temp_max}`}</p>
      <p>{`location: ${data.coord.lon},${data.coord.lat}`}</p>
    </div>
  );
}
