import React from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin } from 'lucide-react';

const footerLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Find a Job', href: '#find-jobs' },
  { label: 'Training', href: '#training' },
  { label: 'About Us', href: '#about' },
  { label: 'Contact', href: '#contact' },
  { label: 'FAQs', href: '#faqs' },
];

const FooterSection = () => {
  return (
    <footer className="bg-slate-950 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-3">
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">National Jobs Portal</h3>
            <p className="text-gray-400 leading-7">
              Your trusted government job gateway. Discover verified employment opportunities across Pakistan with instant alerts and a user-friendly interface.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <div className="grid gap-3 sm:grid-cols-2">
              {footerLinks.map((link) => (
                <a key={link.label} href={link.href} className="text-gray-400 hover:text-secondary-400 transition-colors duration-200">
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Contact Us</h4>
            <div className="space-y-4 text-gray-400">
              <div className="flex items-center gap-3">
                <MapPin size={18} className="text-secondary-400" />
                <span>Islamabad, Pakistan</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-secondary-400" />
                <span>051-9265411</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-secondary-400" />
                <span>info@njp.gov.pk</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 rounded-[2rem] border border-slate-800/70 bg-slate-900/80 p-8 shadow-2xl shadow-black/20">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr] items-center">
            <div>
              <h4 className="text-xl font-semibold text-white mb-3">Stay Updated</h4>
              <p className="text-gray-400 leading-7">
                Subscribe for fresh job alerts, newsletters, and important government career updates.
              </p>
            </div>
            <form className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-2xl border border-slate-800 bg-slate-950 px-5 py-3 text-white placeholder-gray-500 outline-none focus:border-secondary-400 focus:ring-1 focus:ring-secondary-400"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-2xl bg-secondary-400 px-6 py-3 text-sm font-semibold text-slate-950 transition-all duration-200 hover:bg-secondary-500"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-6 border-t border-slate-800/70 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-gray-500 text-sm">© 2026 National Jobs Portal. All rights reserved.</p>
          <div className="flex items-center gap-4 text-secondary-400">
            <a href="#" aria-label="Facebook" className="transition-colors duration-200 hover:text-white"><Facebook size={18} /></a>
            <a href="#" aria-label="Twitter" className="transition-colors duration-200 hover:text-white"><Twitter size={18} /></a>
            <a href="#" aria-label="LinkedIn" className="transition-colors duration-200 hover:text-white"><Linkedin size={18} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
