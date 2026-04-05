import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section id="home" className="rounded-[2rem] bg-gradient-to-br from-emerald-500 via-sky-500 to-indigo-600 px-6 py-14 text-white shadow-glow sm:px-10 lg:px-14">
      <div className="max-w-3xl">
        <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="text-4xl font-bold tracking-tight sm:text-5xl">
          My React Projects Collection
        </motion.h1>
        <motion.p initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="mt-6 max-w-2xl text-lg leading-8 text-emerald-100/90">
          A curated dashboard of interactive React apps, UI experiments, API-driven tools, and full stack demos built with modern workflows.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
          <a
            href="#projects"
            className="inline-flex items-center justify-center rounded-3xl bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Browse Projects
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-3xl border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:border-white hover:bg-white/20"
          >
            Visit GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
