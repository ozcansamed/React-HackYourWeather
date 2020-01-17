import React from "react";
import City from "./City";
import CityWeatherData from "./../city-weather.json";

export default function CityList() {
  return (
    <div className='cityList'>
      {CityWeatherData.map(data => (
        <City key={data.sys.id} data={data} />
      ))}
    </div>
  );
}
