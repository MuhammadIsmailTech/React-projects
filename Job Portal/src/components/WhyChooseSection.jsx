import React from 'react';
import { ShieldCheck, Bell, Lock, Globe, Sparkles, Users } from 'lucide-react';

const reasons = [
  {
    title: 'Verified Postings',
    description: 'All job listings are verified and approved by respective government departments.',
    icon: ShieldCheck,
  },
  {
    title: 'Instant Alerts, Apply Fast',
    description: 'Get real-time notifications for new opportunities matching your profile.',
    icon: Bell,
  },
  {
    title: 'Transparent CV / Profile',
    description: 'Build a comprehensive profile visible to verified government recruiters.',
    icon: Lock,
  },
  {
    title: 'Easy & Interactive',
    description: 'User-friendly interface designed for seamless job search and application.',
    icon: Globe,
  },
  {
    title: 'Quality Service',
    description: '24/7 support team ready to assist you through every stage.',
    icon: Users,
  },
  {
    title: 'Trusted Portal',
    description: 'Backed by Government of Pakistan with the highest credibility.',
    icon: Sparkles,
  },
];

const WhyChooseSection = () => {
  return (
    <section id="why-choose" className="bg-slate-950 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm uppercase tracking-[0.35em] text-secondary-400 font-semibold mb-4">
            Why Choose
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Why Choose <span className="text-secondary-400">National Jobs Portal?</span>
          </h2>
          <p className="mt-4 text-gray-300 max-w-2xl mx-auto text-base sm:text-lg">
            Pakistan’s most trusted platform for government employment.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {reasons.map((reason) => {
            const Icon = reason.icon;
            return (
              <article
                key={reason.title}
                className="rounded-3xl border border-slate-800/70 bg-slate-900/70 p-8 shadow-2xl shadow-black/20 transition-transform duration-300 hover:-translate-y-1 hover:border-secondary-400/30"
              >
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-3xl bg-secondary-500/15 text-secondary-300">
                  <Icon size={28} />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{reason.title}</h3>
                <p className="text-sm leading-7 text-slate-300">{reason.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
