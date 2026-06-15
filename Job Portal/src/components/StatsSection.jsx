import React from 'react';
import { Briefcase, Building2, Smile } from 'lucide-react';

const stats = [
  {
    label: 'Active Jobs',
    value: '18+',
    description: 'Live government openings available now.',
    icon: Briefcase,
  },
  {
    label: 'Departments',
    value: '221+',
    description: 'Fully verified public sector departments.',
    icon: Building2,
  },
  {
    label: 'Happy Users',
    value: '1,767,869+',
    description: 'Candidates placed through our portal.',
    icon: Smile,
  },
];

const StatsSection = () => {
  return (
    <section id="statistics" className="bg-slate-950 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm uppercase tracking-[0.35em] text-secondary-400 font-semibold mb-3">
            Key Performance
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Trusted results for every job seeker
          </h2>
          <p className="mt-4 text-gray-300 max-w-2xl mx-auto text-base sm:text-lg">
            Track our platform performance with verified job counts, departments, and happy user statistics.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {stats.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="rounded-[2rem] border border-slate-800/70 bg-slate-900/75 p-8 shadow-2xl shadow-black/20 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-secondary-500/15 text-secondary-300">
                  <Icon size={28} />
                </div>
                <h3 className="text-5xl font-bold text-white">{item.value}</h3>
                <p className="mt-4 text-xl font-semibold text-white">{item.label}</p>
                <p className="mt-3 text-sm leading-7 text-slate-300">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
