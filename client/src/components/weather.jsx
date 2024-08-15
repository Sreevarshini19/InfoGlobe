import React, { useState } from 'react';
import './weather.css';
import drizzle from '../assets/drizzle.png';
import rain from '../assets/rain.png';
import snow from '../assets/snow.png';
import clearsky from '../assets/clearsky.png';
import searchIcon from '../assets/search.webp';
import cloud from '../assets/cloud.png';
import Homehead from './homehead';

const Details = ({ ticon, temp, city, country, lat, long, pressure, humidity, visibility, wind, descr }) => {
  const iconimg = {
    "01d": clearsky,
    "01n": clearsky,
    "02d": cloud,
    "02n": cloud,
    "03d": drizzle,
    "03n": drizzle,
    "04d": drizzle,
    "04n": drizzle,
    "09d": rain,
    "09n": rain,
    "10d": rain,
    "10n": rain,
    "13d": snow,
    "13n": snow,
  };
  const icon = iconimg[ticon] ? iconimg[ticon] : cloud;
  return (
    <div className='weather-details'>
      <div className="weather-image">
        <img src={icon} alt="Weather Icon" />
      </div>
      <div className='weather-info'>
        <div className="content">
          <span>Temperature: </span>
          <span>{temp} C</span>
        </div>
        <div className="content">
          <span style={{color:"black"}}>Description: </span>
          <span style={{color:"black"}}>{descr}</span>
        </div>
        <div className="content">
          <span>City: </span>
          <span>{city}</span>
        </div>
        <div className="content">
          <span>Country: </span>
          <span>{country}</span>
        </div>
        <div className="content">
          <span>Latitude: </span>
          <span>{lat}</span>
        </div>
        <div className="content">
          <span>Longitude: </span>
          <span>{long}</span>
        </div>
        <div className="content">
          <span>Pressure: </span>
          <span>{pressure}</span>
        </div>
        <div className="content">
          <span>Humidity: </span>
          <span>{humidity}%</span>
        </div>
        <div className="content">
          <span>Visibility: </span>
          <span>{visibility} m</span>
        </div>
        <div className="content">
          <span>Wind Speed: </span>
          <span>{wind} m/s</span>
        </div>
      </div>
    </div>
  );
};

function Weather() {
  const [text, setText] = useState('');
  const [city, setCity] = useState('Chennai');
  const [country, setCountry] = useState('IN');
  const [descr, setDes] = useState('');
  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);
  const [temp, setTemp] = useState(0);
  const [pressure, setPressure] = useState(0);
  const [humidity, setHumid] = useState(0);
  const [visibility, setVisibility] = useState(0);
  const [wind, setWindspeed] = useState(0);
  const [ticon, setIcon] = useState('');
  const [notfound, setNotfound] = useState(false);
  const [loading, setLoading] = useState(false);

  const searchtemp = async () => {
    setLoading(true);
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=f3a1d8c8141b9c65ee36b9bac07a07e1&units=Metric`;
    try {
      let res = await fetch(url);
      let data = await res.json();
      if (data.cod === "404") {
        setNotfound(true);
        setLoading(false);
        return;
      }
      setCity(data.name);
      setCountry(data.sys.country);
      setDes(data.weather[0].description);
      setIcon(data.weather[0].icon);
      setLat(Math.round(data.coord.lat));
      setLong(Math.round(data.coord.lon));
      setTemp(data.main.temp);
      setHumid(data.main.humidity);
      setPressure(data.main.pressure);
      setVisibility(data.visibility);
      setWindspeed(data.wind.speed);
      setNotfound(false);
    } catch (err) {
      console.log("Error:", err);
      setNotfound(true);
    } finally {
      setLoading(false);
    }
  };

  const handlecity = (e) => {
    setText(e.target.value);
  };

  const handleKey = (e) => {
    if (e.key === 'Enter') {
      searchtemp();
    }
  };

  return (
    <>
      <Homehead />
      <div className='weather-container'>
        <h2 className='weather-heading'>Weather App</h2>
        <div className='weather-search'>
          <input
            type="text"
            placeholder='Enter City name'
            onChange={handlecity}
            onKeyDown={handleKey}
            value={text}
          />
          <img src={searchIcon} alt="search" onClick={searchtemp} />
        </div>
        <div className='weather'>
          {!loading && !notfound ? (
            <Details
              ticon={ticon}
              temp={temp}
              city={city}
              country={country}
              lat={lat}
              long={long}
              pressure={pressure}
              humidity={humidity}
              visibility={visibility}
              wind={wind}
              descr={descr}
            />
          ) : (
            <div>{loading ? "Loading..." : "City not found"}</div>)
          } 
        </div>
      </div>
    </>
  );
}

export default Weather;
