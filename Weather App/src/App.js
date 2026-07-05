import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import ForecastRow from './components/ForecastRow.jsx';
import HourlyRow from './components/HourlyRow.jsx';
import PaginationDots from './components/PaginationDots.jsx';

const DEFAULT_CITY = 'Inverness';

export default function App() {
  const [city, setCity] = useState(null);
  const [forecast, setForecast] = useState(null);

  const getWeatherIconUrl = (icon) => `https://openweathermap.org/img/wn/${icon}@4x.png`;

  const fetchWeather = async (search = DEFAULT_CITY) => {
    try {
      const uri = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=${process.env.REACT_APP_API_KEY}`;
      const res = await axios.get(uri);
      const d = res.data;
      const info = {
        name: d.name,
        temp: d.main.temp,
        weathermood: d.weather[0].main,
        icon: d.weather[0].main,
        speed: d.wind.speed,
        dt: d.dt,
        timezone: d.timezone,
        iconUrl: getWeatherIconUrl(d.weather[0].icon),
      };
      setCity(info);
      // fetch forecast data (onecall)
      const lat = d.coord.lat;
      const lon = d.coord.lon;
      const furi = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&units=metric&appid=${process.env.REACT_APP_API_KEY}`;
      const fres = await axios.get(furi);
      setForecast(fres.data);
    } catch (err) {
      console.warn('Weather fetch failed', err);
      setCity(null);
      setForecast(null);
    }
  };

  useEffect(() => {
    fetchWeather();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const bg = (mood) => {
    if (!mood) return 'bg-[linear-gradient(120deg,#0ea5e9,#2563eb)]';
    const s = mood.toLowerCase();
    if (s.includes('rain') || s.includes('drizzle')) return "bg-[url('https://images.unsplash.com/photo-1527766833261-b09c3163a791?auto=format&fit=crop&w=1600&q=60')]";
    if (s.includes('cloud')) return "bg-[url('https://images.unsplash.com/photo-1501630834273-4b5604d2ee31?auto=format&fit=crop&w=1600&q=60')]";
    return "bg-[url('https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1600&q=60')]";
  };

  return (
    <div className={`app-root`}> 
      <div className={`weather-shell ${bg(city?.weathermood)} bg-photo`}> 
        <div className="overlay-top" />
        <div className="content-grid">
          <main className="left-col">
            <Header location={city?.name || 'Inverness'} updated={city ? 'Updated a few minutes ago' : 'Updated a moment ago'} />
            <div className="mt-6">
              <Hero city={city || { temp: 13, weathermood: 'Sunny', speed: 3 }} />
            </div>
            <div className="mt-6">
              <ForecastRow days={forecast?.daily?.slice(0, 7).map((d, i) => ({ day: i === 0 ? 'Today' : new Date(d.dt * 1000).toLocaleDateString(undefined, { weekday: 'short' }), high: Math.round(d.temp.max), low: Math.round(d.temp.min), active: i === 0 }))} />
            </div>
            <div className="mt-4">
              <HourlyRow hours={forecast?.hourly?.slice(0, 12).map((h) => ({ t: new Date(h.dt * 1000).toLocaleTimeString([], { hour: '2-digit' }), temp: Math.round(h.temp) }))} />
            </div>
          </main>
          <aside className="right-col">
            <div className="glass rounded-2xl p-6">
              <h3 className="text-lg font-semibold">Details</h3>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="glass p-3 text-center rounded-lg">Feels like<br/><strong>--°</strong></div>
                <div className="glass p-3 text-center rounded-lg">Humidity<br/><strong>--%</strong></div>
                <div className="glass p-3 text-center rounded-lg">Wind<br/><strong>{city?.speed ?? '--'} m/s</strong></div>
                <div className="glass p-3 text-center rounded-lg">Visibility<br/><strong>--</strong></div>
              </div>
            </div>
            <div className="mt-6 glass rounded-2xl p-4">
              <h4 className="text-sm text-white/80">Hourly overview</h4>
              <div className="mt-3">
                <HourlyRow />
              </div>
            </div>
            <div className="mt-6 text-center">
              <PaginationDots pages={3} active={0} />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
