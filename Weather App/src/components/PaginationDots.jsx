import React from 'react';

export default function PaginationDots({ pages = 3, active = 0 }) {
  return (
    <div className="dot-indicator">
      {Array.from({ length: pages }).map((_, i) => (
        <div key={i} className={`w-2 h-2 rounded-full ${i === active ? 'bg-white' : 'bg-white/40'}`} />
      ))}
    </div>
  );
}
