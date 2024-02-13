import './App.css';
import React, { useEffect, useState } from "react";
import WeatherCard from './WeatherCard';  // Corrected import path
import { Dimmer, Loader } from 'semantic-ui-react';

export default function App() {

  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      navigator.geolocation.getCurrentPosition(async function (position) {
        const { latitude, longitude } = position.coords;

        try {
          const response = await fetch(`${process.env.REACT_APP_API_URL}/weather/?lat=${latitude}&lon=${longitude}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`);
          const result = await response.json();
          setData(result);
          console.log(result);
        } catch (error) {
          console.error('Error fetching weather data:', error);
        }
      });
    };
    fetchData();
  }, []); // Empty dependency array to run the effect only once when the component mounts

  return (
    <div className="App">
      {data && typeof data.main !== 'undefined' ? (
        <WeatherCard weatherData={data} />
        ) : (
        <div>
          <Dimmer active>
            <Loader>Loading..</Loader>
          </Dimmer>
        </div>
        )}
    </div>
  );
}
