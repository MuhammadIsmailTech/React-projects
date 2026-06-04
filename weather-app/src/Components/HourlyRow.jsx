import React from 'react';
import { Sun } from 'lucide-react';

export default function HourlyRow({ hours = [] }) {
  const list = hours.length ? hours : Array.from({ length: 8 }).map((_, i) => ({ t: `${13 + i}:00`, temp: 11 + i }));

  return (
    <div className="mt-4">
      <div className="hourly-list">
        {list.map((h, idx) => (
          <div key={idx} className="glass rounded-xl p-3 min-w-[84px] text-center">
            <div className="text-sm text-white/80">{h.t}</div>
            <div className="my-2 text-yellow-300"><Sun size={20} /></div>
            <div className="text-lg font-semibold">{h.temp}°</div>
          </div>
        ))}
      </div>
    </div>
  );
}
