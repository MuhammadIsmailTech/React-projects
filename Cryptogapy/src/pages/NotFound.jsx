import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function NotFound() {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="grid min-h-[70vh] place-items-center px-6 py-24">
      <div className="max-w-xl text-center">
        <p className="text-sm uppercase tracking-[0.4em] text-slate-500">404 error</p>
        <h1 className="mt-6 text-6xl font-semibold">Page not found</h1>
        <p className="mt-4 text-slate-400">This route does not exist yet. Return to the dashboard to continue tracking crypto markets.</p>
        <Link to="/dashboard" className="mt-8 inline-flex rounded-3xl bg-brand px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400">Go back home</Link>
      </div>
    </motion.div>
  );
}

export default NotFound;
