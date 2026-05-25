import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function Signup() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mx-auto flex max-w-4xl items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
      <div className="w-full rounded-[2rem] border border-slate-700/80 bg-slate-950/80 p-10 shadow-glass">
        <div className="mb-8 text-center">
          <p className="text-sm uppercase tracking-[0.4em] text-slate-500">Join the network</p>
          <h1 className="mt-3 text-4xl font-semibold">Create your account</h1>
          <p className="mt-3 text-slate-400">Start tracking crypto prices, watchlist, and portfolio insights.</p>
        </div>
        <form className="space-y-5">
          <label className="block">
            <span className="text-sm text-slate-300">Full name</span>
            <input type="text" placeholder="Jane Doe" className="mt-2 w-full rounded-3xl border border-slate-700/90 bg-slate-900/90 px-4 py-3 text-slate-100 outline-none transition focus:border-brand" />
          </label>
          <label className="block">
            <span className="text-sm text-slate-300">Email</span>
            <input type="email" placeholder="hello@cryptogapy.com" className="mt-2 w-full rounded-3xl border border-slate-700/90 bg-slate-900/90 px-4 py-3 text-slate-100 outline-none transition focus:border-brand" />
          </label>
          <label className="block">
            <span className="text-sm text-slate-300">Password</span>
            <input type="password" placeholder="Create password" className="mt-2 w-full rounded-3xl border border-slate-700/90 bg-slate-900/90 px-4 py-3 text-slate-100 outline-none transition focus:border-brand" />
          </label>
          <button type="button" className="w-full rounded-3xl bg-brand px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400">Create Account</button>
        </form>
        <p className="mt-6 text-center text-sm text-slate-400">
          Already have an account?{' '}
          <Link to="/login" className="text-brand transition hover:text-cyan-300">Sign in</Link>
        </p>
      </div>
    </motion.div>
  );
}

export default Signup;
