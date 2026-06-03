import React from 'react';

export default function Leftsidebar({ city, units }) {
  if (!city) {
    return (
      <aside className="sidebar sidebar-empty">
        <div className="panel">
          <h2>Weather App</h2>
          <p>Search a city or use your current location to see advanced weather details.</p>
        </div>
      </aside>
    );
  }

  return (
    <aside className="sidebar">
      <div className="panel panel-main">
        <div className="location-row">
          <div>
            <h2>{city.name}, {city.country}</h2>
            <p>{city.localTime}</p>
          </div>
        </div>

        <div className="weather-summary">
          <img className="weather-icon" src={city.iconUrl} alt={city.weathermood} />
          <div>
            <h1>{Math.round(city.temp)}{units === 'metric' ? '°C' : '°F'}</h1>
            <p>{city.weathermood}</p>
            <p className="weather-sm">Feels like {Math.round(city.feels_like)}{units === 'metric' ? '°C' : '°F'}</p>
          </div>
        </div>

        <div className="details-grid">
          <div>
            <span>Humidity</span>
            <strong>{city.humidity}%</strong>
          </div>
          <div>
            <span>Pressure</span>
            <strong>{city.pressure} hPa</strong>
          </div>
          <div>
            <span>Wind</span>
            <strong>{Math.round(city.speed * (units === 'metric' ? 3.6 : 1))} {units === 'metric' ? 'km/h' : 'mph'}</strong>
          </div>
          <div>
            <span>Visibility</span>
            <strong>{city.visibility ? `${Math.round(city.visibility / 1000)} km` : 'N/A'}</strong>
          </div>
          <div>
            <span>Sunrise</span>
            <strong>{new Date((city.sunrise + city.timezone) * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</strong>
          </div>
          <div>
            <span>Sunset</span>
            <strong>{new Date((city.sunset + city.timezone) * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</strong>
          </div>
        </div>
      </div>
    </aside>
  );
}
