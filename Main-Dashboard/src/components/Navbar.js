import { motion } from 'framer-motion';

const Navbar = ({ darkMode, onToggleTheme }) => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="border-b border-slate-200 bg-white/85 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/85"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-500/20">
            <span className="text-lg font-bold">R</span>
          </div>
          <div>
            <p className="font-semibold">My React Projects</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Dashboard showcase</p>
          </div>
        </div>

        <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-300 md:flex">
          <a href="#home" className="hover:text-emerald-600 dark:hover:text-emerald-400">Home</a>
          <a href="#projects" className="hover:text-emerald-600 dark:hover:text-emerald-400">Projects</a>
          <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-emerald-600 dark:hover:text-emerald-400">GitHub</a>
        </nav>

        <button
          type="button"
          onClick={onToggleTheme}
          className="inline-flex items-center rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 shadow-sm transition hover:border-emerald-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
        >
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
    </motion.header>
  );
};

export default Navbar;
