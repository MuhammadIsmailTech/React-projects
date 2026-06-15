import React from 'react';
import { Star, MessageSquare, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    quote: 'The portal made my government job search simple and trustworthy. I received alerts the same day new vacancies were posted.',
    name: 'Ayesha Khan',
    role: 'Software Engineer',
    organization: 'Government IT Board',
  },
  {
    quote: 'Verified listings and straightforward application steps helped me land a position with confidence.',
    name: 'Hamza Ali',
    role: 'Research Analyst',
    organization: 'Ministry of Climate Change',
  },
  {
    quote: 'The platform is fast, responsive, and easy to use. The support team answered all my queries quickly.',
    name: 'Sania Zahid',
    role: 'Accountant',
    organization: 'National Bank of Pakistan',
  },
];

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="bg-slate-950 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between mb-10">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-secondary-400 font-semibold mb-3">
              Success Stories
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white max-w-2xl">
              What our candidates are saying
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <button className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-slate-800/80 bg-slate-900/70 text-secondary-300 hover:bg-secondary-500/15 transition-colors duration-200">
              <ChevronLeft size={20} />
            </button>
            <button className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-slate-800/80 bg-slate-900/70 text-secondary-300 hover:bg-secondary-500/15 transition-colors duration-200">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {testimonials.map((item) => (
            <article
              key={item.name}
              className="rounded-[2rem] border border-slate-800/70 bg-slate-900/80 p-8 shadow-2xl shadow-black/20 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="mb-6 inline-flex items-center gap-2 text-secondary-400">
                <MessageSquare size={20} />
                <span className="text-sm uppercase tracking-[0.35em] font-semibold">Verified Review</span>
              </div>
              <div className="mb-6 flex gap-1 text-secondary-400">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} size={18} />
                ))}
              </div>
              <p className="text-lg leading-8 text-slate-300">“{item.quote}”</p>
              <div className="mt-8 border-t border-slate-800/80 pt-6">
                <p className="font-semibold text-white">{item.name}</p>
                <p className="text-sm text-slate-400">{item.role}, {item.organization}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
