import React from 'react';

export default function Rightsidebar({
  city,
  forecast,
  searchVal,
  setSearchVal,
  units,
  onUnitChange,
  onSearch,
  onLocation,
  onHistoryClick,
  history,
  isLoading,
  error,
}) {
  const getDay = (dt) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days[new Date(dt * 1000).getDay()];
  };

  const getHour = (dt, timezone) => {
    return new Date((dt + timezone) * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <main className="right-panel">
      <section className="panel panel-search">
        <form className="search-bar" onSubmit={onSearch}>
          <input
            type="text"
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            placeholder="Search city"
          />
          <button type="submit" className="btn btn-primary">
            Search
          </button>
        </form>

        <div className="actions-row">
          <div className="unit-switch">
            <button
              type="button"
              className={units === 'metric' ? 'btn active' : 'btn'}
              onClick={() => onUnitChange('metric')}
            >
              °C
            </button>
            <button
              type="button"
              className={units === 'imperial' ? 'btn active' : 'btn'}
              onClick={() => onUnitChange('imperial')}
            >
              °F
            </button>
          </div>
          <button type="button" className="btn btn-secondary" onClick={onLocation}>
            Use My Location
          </button>
        </div>

        {error && <p className="message message-error">{error}</p>}
        {isLoading && <p className="message message-info">Loading weather data…</p>}

        {history.length > 0 && (
          <div className="history-card">
            <h3>Recent searches</h3>
            <div className="history-list">
              {history.map((item) => (
                <button key={item} type="button" className="history-item" onClick={() => onHistoryClick(item)}>
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </section>

      {city && forecast && (
        <>
          <section className="panel panel-summary">
            <div className="summary-header">
              <h3>5-Day Forecast</h3>
              <p>Weather predictions for the next five days.</p>
            </div>
            <div className="forecast-grid">
              {forecast.daily.slice(1, 6).map((day) => (
                <div key={day.dt} className="forecast-card">
                  <span>{getDay(day.dt)}</span>
                  <img src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`} alt={day.weather[0].description} />
                  <p>{day.weather[0].main}</p>
                  <strong>{Math.round(day.temp.day)}{units === 'metric' ? '°C' : '°F'}</strong>
                </div>
              ))}
            </div>
          </section>

          <section className="panel panel-hourly">
            <div className="summary-header">
              <h3>Hourly Outlook</h3>
              <p>Upcoming hours for the selected city.</p>
            </div>
            <div className="hourly-scroll">
              {forecast.hourly.slice(0, 8).map((hour) => (
                <div key={hour.dt} className="hour-card">
                  <span>{getHour(hour.dt, forecast.timezone_offset)}</span>
                  <img src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`} alt={hour.weather[0].description} />
                  <strong>{Math.round(hour.temp)}{units === 'metric' ? '°C' : '°F'}</strong>
                  <small>{hour.weather[0].main}</small>
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </main>
  );
}
