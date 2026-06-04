import React from 'react';
import { Sun, CloudSnow } from 'lucide-react';

function DayCard({ day = 'Today', icon = 'sun', high = 14, low = 7, active = false }) {
  return (
    <div className={`forecast-card ${active ? 'active-day' : ''}`}>
      <div className="text-sm text-white/80">{day}</div>
      <div className="my-2">{icon === 'sun' ? <Sun size={24} /> : <CloudSnow size={24} />}</div>
      <div className="text-sm mt-1"><strong>{high}°</strong> <span className="text-white/60">{low}°</span></div>
    </div>
  );
}

export default function ForecastRow({ days = [] }) {
  const list = days.length ? days : [
    { day: 'Today', high: 13, low: 7, active: true },
    { day: 'Thu', high: 14, low: 8 },
    { day: 'Fri', high: 13, low: 9 },
    { day: 'Sat', high: 12, low: 7 },
    { day: 'Sun', high: 11, low: 6 },
  ];

  return (
    <div>
      <div className="forecast-scroll">
        {list.map((d, i) => (
          <DayCard key={i} {...d} />
        ))}
      </div>
    </div>
  );
}
