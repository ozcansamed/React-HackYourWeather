import React from "react";
import "./App.css";
import CityList from "./components/CityList";
import Weather from "./components/Weather";

function App() {
  return (
    <div className='App'>
      <Weather />
      <CityList />
    </div>
  );
}

export default App;
