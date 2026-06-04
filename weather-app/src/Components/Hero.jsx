import React from 'react';
import WeatherIcon from './WeatherIcon';

export default function Hero({ city }) {
  const temp = city?.temp ? Math.round(city.temp) : '--';
  const precip = Math.floor(Math.random() * 30); // placeholder
  const wind = city?.speed ? `${Math.round(city.speed)} m/s` : '--';

  return (
    <section className="glass rounded-2xl p-6 lg:p-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 items-center">
        <div className="col-span-1 flex items-center justify-center">
          <WeatherIcon icon={city?.weathermood || 'sun'} />
        </div>

        <div className="col-span-1 lg:col-span-2">
          <div className="flex items-baseline gap-3">
            <span className="text-6xl lg:text-7xl font-extrabold drop-shadow">{temp}°</span>
            <div className="text-sm text-white/80">
              <div>{precip}% precipitation</div>
              <div className="mt-2">{wind}</div>
            </div>
          </div>
          <p className="mt-4 text-white/85">{city?.weathermood || 'Sunny and light winds'}</p>

          <div className="mt-4 flex gap-3">
            <span className="pill-badge">M UV</span>
            <span className="pill-badge">L Pollution</span>
          </div>
        </div>
      </div>
    </section>
  );
}
