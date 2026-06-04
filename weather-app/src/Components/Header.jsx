import React from 'react';
import { ArrowLeft, Plus } from 'lucide-react';

export default function Header({ location = 'Inverness', updated = 'Updated a moment ago' }) {
  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button className="p-2 bg-white/8 rounded-lg glass hover:bg-white/12">
          <ArrowLeft size={18} />
        </button>
        <div>
          <h1 className="text-2xl font-semibold drop-shadow-md">{location}</h1>
          <p className="text-sm text-white/70 mt-0.5">{updated}</p>
        </div>
      </div>

      <div>
        <button className="p-2 w-10 h-10 flex items-center justify-center rounded-md glass border">
          <Plus size={14} />
        </button>
      </div>
    </header>
  );
}
