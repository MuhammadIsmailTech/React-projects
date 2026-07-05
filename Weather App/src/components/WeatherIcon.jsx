import React from 'react';
import { Sun, Cloud, CloudRain, CloudSnow, CloudDrizzle } from 'lucide-react';

const mapIcon = (code) => {
  if (!code) return <Sun size={72} />;
  const c = code.toLowerCase();
  if (c.includes('rain')) return <CloudRain size={72} />;
  if (c.includes('drizzle')) return <CloudDrizzle size={72} />;
  if (c.includes('snow')) return <CloudSnow size={72} />;
  if (c.includes('cloud')) return <Cloud size={72} />;
  return <Sun size={72} />;
};

export default function WeatherIcon({ icon }) {
  return (
    <div className="text-yellow-300 drop-shadow-lg">
      {mapIcon(icon)}
    </div>
  );
}
