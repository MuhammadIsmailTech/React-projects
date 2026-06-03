import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './App.css';
import Leftsidebar from './Components/Leftsidebar';
import Rightsidebar from './Components/Rightsidebar';

const DEFAULT_CITY = 'Pune';
const HISTORY_KEY = 'weather-app-history';

function App() {
  const [city, setCity] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [searchVal, setSearchVal] = useState(DEFAULT_CITY);
  const [units, setUnits] = useState('metric');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem(HISTORY_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  const saveHistory = (cityName) => {
    setHistory((prev) => {
      const normalized = cityName.trim();
      const updated = [normalized, ...prev.filter((item) => item.toLowerCase() !== normalized.toLowerCase())].slice(0, 5);
      localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const getWeatherIconUrl = (icon) => `https://openweathermap.org/img/wn/${icon}@4x.png`;

  const fetchForecast = async (lat, lon, selectedUnits) => {
    try {
      const uri = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&units=${selectedUnits}&appid=${process.env.REACT_APP_API_KEY}`;
      const response = await axios.get(uri);
      setForecast(response.data);
    } catch (err) {
      console.error('Forecast error:', err);
    }
  };

  const fetchWeather = async (search, selectedUnits = units) => {
    if (!search || !search.trim()) {
      setError('Please enter a city name.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const uri = `https://api.openweathermap.org/data/2.5/weather?q=${search.trim()}&units=${selectedUnits}&appid=${process.env.REACT_APP_API_KEY}`;
      const response = await axios.get(uri);
      const data = response.data;
      const { temp, humidity, pressure, feels_like } = data.main;
      const { main: weathermood, icon } = data.weather[0];
      const { visibility } = data;
      const { name, dt, timezone } = data;
      const { lat, lon } = data.coord;
      const { speed } = data.wind;
      const { country, sunrise, sunset } = data.sys;

      const localTime = new Date((dt + timezone) * 1000).toLocaleString([], {
        weekday: 'long',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });

      const weatherInfo = {
        temp,
        humidity,
        pressure,
        feels_like,
        visibility,
        weathermood,
        name,
        speed,
        country,
        sunrise,
        sunset,
        lat,
        lon,
        dt,
        timezone,
        icon,
        iconUrl: getWeatherIconUrl(icon),
        localTime,
      };

      setCity(weatherInfo);
      saveHistory(name);
      setSearchVal(name);
      await fetchForecast(lat, lon, selectedUnits);
    } catch (err) {
      console.error('Search error:', err);
      setError('City not found. Please try a different location.');
      setCity(null);
      setForecast(null);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchWeatherByCoords = async (lat, lon) => {
    setIsLoading(true);
    setError('');

    try {
      const uri = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${process.env.REACT_APP_API_KEY}`;
      const response = await axios.get(uri);
      const data = response.data;
      const { temp, humidity, pressure, feels_like } = data.main;
      const { main: weathermood, icon } = data.weather[0];
      const { visibility } = data;
      const { name, dt, timezone } = data;
      const { speed } = data.wind;
      const { country, sunrise, sunset } = data.sys;

      const localTime = new Date((dt + timezone) * 1000).toLocaleString([], {
        weekday: 'long',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });

      const weatherInfo = {
        temp,
        humidity,
        pressure,
        feels_like,
        visibility,
        weathermood,
        name,
        speed,
        country,
        sunrise,
        sunset,
        lat,
        lon,
        dt,
        timezone,
        icon,
        iconUrl: getWeatherIconUrl(icon),
        localTime,
      };

      setCity(weatherInfo);
      saveHistory(name);
      setSearchVal(name);
      await fetchForecast(lat, lon, units);
    } catch (err) {
      console.error('Geolocation weather error:', err);
      setError('Unable to load weather for your location.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    fetchWeather(searchVal);
  };

  const handleHistoryClick = (cityName) => {
    setSearchVal(cityName);
    fetchWeather(cityName);
  };

  const handleLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by this browser.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        fetchWeatherByCoords(position.coords.latitude, position.coords.longitude);
      },
      () => setError('Permission denied. Please allow location access.'),
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const handleUnitChange = (selectedUnits) => {
    if (units === selectedUnits) return;
    setUnits(selectedUnits);
    if (city?.name) {
      fetchWeather(city.name, selectedUnits);
    }
  };

  useEffect(() => {
    const initialCity = history?.[0] || DEFAULT_CITY;
    setSearchVal(initialCity);
    fetchWeather(initialCity, units);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="app-container">
      <Leftsidebar city={city} units={units} />
      <Rightsidebar
        city={city}
        forecast={forecast}
        searchVal={searchVal}
        setSearchVal={setSearchVal}
        units={units}
        onUnitChange={handleUnitChange}
        onSearch={handleSearch}
        onLocation={handleLocation}
        onHistoryClick={handleHistoryClick}
        history={history}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
}

export default App;
