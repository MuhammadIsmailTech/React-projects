import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate('/dashboard');
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mx-auto flex max-w-4xl items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
      <div className="w-full rounded-[2rem] border border-slate-700/80 bg-slate-950/80 p-10 shadow-glass">
        <div className="mb-8 text-center">
          <p className="text-sm uppercase tracking-[0.4em] text-slate-500">Welcome back</p>
          <h1 className="mt-3 text-4xl font-semibold">Log in to Cryptogapy</h1>
          <p className="mt-3 text-slate-400">Use a dummy account for preview purposes. No backend required.</p>
        </div>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <label className="block">
            <span className="text-sm text-slate-300">Email</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="hello@cryptogapy.com"
              className="mt-2 w-full rounded-3xl border border-slate-700/90 bg-slate-900/90 px-4 py-3 text-slate-100 outline-none transition focus:border-brand"
            />
          </label>
          <label className="block">
            <span className="text-sm text-slate-300">Password</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="••••••••"
              className="mt-2 w-full rounded-3xl border border-slate-700/90 bg-slate-900/90 px-4 py-3 text-slate-100 outline-none transition focus:border-brand"
            />
          </label>
          <button
            type="submit"
            disabled={!email || !password}
            className="w-full rounded-3xl bg-brand px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Sign In
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-slate-400">
          Don’t have an account?{' '}
          <Link to="/signup" className="text-brand transition hover:text-cyan-300">Create one</Link>
        </p>
      </div>
    </motion.div>
  );
}

export default Login;
