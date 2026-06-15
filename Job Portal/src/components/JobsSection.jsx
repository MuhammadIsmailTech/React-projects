import React from 'react';
import { Bookmark, Briefcase, Users } from 'lucide-react';

const jobs = [
  {
    title: 'Chairperson',
    organization: 'Ministry of Climate Change (MOCC)',
    experience: '10+ years',
    type: 'Full-time',
    applicants: 16,
    badge: 'Senior Leadership',
  },
  {
    title: 'DIRECTOR ITU & UNITED NATIONS',
    organization: 'Ministry of Information Technology and Telecommunication (MOITT)',
    experience: '15+ years',
    type: 'Full-time',
    applicants: 56,
    badge: 'Executive Role',
  },
  {
    title: 'Research Assistant',
    organization: 'Ministry of Maritime Affairs (MOMA)',
    experience: 'Full-time',
    type: 'Full-time',
    applicants: 141,
    badge: 'Research & Development',
  },
  {
    title: 'Manager, Business Planning & Strategy',
    organization: 'Ignite - National Technology Fund',
    experience: '7+ years',
    type: 'Full-time',
    applicants: 28,
    badge: 'Strategy',
  },
  {
    title: 'Director General (Cloud)',
    organization: 'Ministry of Information Technology and Telecommunication (MOITT)',
    experience: '15+ years',
    type: 'Full-time',
    applicants: 42,
    badge: 'Cloud & Infrastructure',
  },
  {
    title: 'President National Bank of Pakistan (NBP) / Chief Executive Officer (CEO)',
    organization: 'Finance Division, Government of Pakistan',
    experience: '5+ years',
    type: 'Full-time',
    applicants: 68,
    badge: 'Executive Finance',
  },
];

const JobsSection = () => {
  return (
    <section id="latest-jobs" className="bg-slate-950 text-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-10">
          <div>
            <p className="text-sm text-secondary-400 uppercase tracking-[0.28em] font-semibold">Latest Government Jobs</p>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-white">Fresh opportunities posted today</h2>
          </div>

          <a
            href="#"
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-secondary-400 to-secondary-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-xl shadow-secondary-500/20 hover:scale-[1.01] transition-transform duration-200"
          >
            View All
            <span className="ml-2">→</span>
          </a>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {jobs.map((job) => (
            <article
              key={job.title}
              className="group relative overflow-hidden rounded-3xl border border-slate-800/80 bg-slate-900/80 p-6 shadow-2xl shadow-black/30 transition-all duration-300 hover:-translate-y-1 hover:border-secondary-500/50"
            >
              <div className="absolute right-5 top-5 rounded-full border border-slate-700/70 bg-slate-950 p-3 text-secondary-400 transition-colors duration-200 group-hover:bg-secondary-500 group-hover:text-slate-950">
                <Bookmark size={18} />
              </div>

              <div className="mb-6">
                <span className="inline-flex rounded-full bg-secondary-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-secondary-300">
                  {job.badge}
                </span>
              </div>

              <h3 className="text-xl font-semibold text-white leading-tight sm:text-2xl">
                {job.title}
              </h3>
              <p className="mt-3 text-sm text-slate-300 leading-relaxed">{job.organization}</p>

              <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-slate-300">
                <span className="inline-flex items-center gap-2 rounded-full border border-slate-700/70 bg-slate-950/80 px-3 py-2">
                  <Briefcase size={16} />
                  {job.experience} • {job.type}
                </span>
              </div>

              <div className="mt-8 border-t border-slate-800/80 pt-6 flex items-center justify-between gap-3">
                <div className="inline-flex items-center gap-2 text-sm text-slate-400">
                  <Users size={16} />
                  <span>{job.applicants}</span>
                </div>

                <button className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-secondary-400 to-secondary-500 px-5 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-secondary-500/30 transition-all duration-200 hover:scale-[1.02]">
                  Apply
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JobsSection;
