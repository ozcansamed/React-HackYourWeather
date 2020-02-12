import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./CityDetail.css";
import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";

export default function CityDetail() {
  // const { searchedCities } = useContext(WeatherContext);
  const params = useParams();
  console.log(params);
  // const city = searchedCities.filter(selectedCity => selectedCity.id === params.id);
  const [dailyData, setDailyData] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  useEffect(() => {
    setLoading(true);
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?id=${params.id}&units=metric&appid=${process.env.REACT_APP_OPENWEATHERMAP_API_KEY}`
    )
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        throw new Error();
      })
      .then(data => {
        setDailyData(data);
        console.log(data);
        setLoading(false);
      })
      .catch(() => {
        setHasError(true);
        setLoading(false);
      });
  }, [params.id]);
  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {hasError && <p>Error occurred</p>}
      {dailyData && (
        <div className='graph'>
          <Link style={{ color: "black" }} to='/'>
            Back
          </Link>
          <AreaChart
            width={730}
            height={250}
            data={dailyData.list}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id='colorUv' x1='0' y1='0' x2='0' y2='1'>
                <stop offset='5%' stopColor='#8884d8' stopOpacity={0.8} />
                <stop offset='95%' stopColor='#8884d8' stopOpacity={0} />
              </linearGradient>
              <linearGradient id='colorPv' x1='0' y1='0' x2='0' y2='1'>
                <stop offset='5%' stopColor='#82ca9d' stopOpacity={0.8} />
                <stop offset='95%' stopColor='#82ca9d' stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey='dt_txt' />
            <YAxis dataKey='main.temp' />
            <CartesianGrid strokeDasharray='3 3' />
            <Tooltip />
            <Area
              type='monotone'
              dataKey='main.temp'
              stroke='#8884d8'
              fillOpacity={1}
              fill='url(#colorUv)'
            />
          </AreaChart>
        </div>
      )}
    </div>
  );
}
