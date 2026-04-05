import { Link } from 'react-router-dom';

function Signup() {
  return (
    <div className="mx-auto max-w-md pb-16">
      <div className="mb-10 text-center">
        <p className="text-sm uppercase tracking-[0.25em] text-sky-600 dark:text-sky-300">Join Shoply</p>
        <h1 className="mt-3 text-4xl font-semibold text-slate-900 dark:text-slate-100">Create a new account</h1>
      </div>
      <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-soft dark:border-slate-800 dark:bg-slate-900">
        <div className="space-y-5">
          <label className="block">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Name</span>
            <input type="text" placeholder="Jane Doe" className="mt-3 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:ring-sky-800" />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Email</span>
            <input type="email" placeholder="you@example.com" className="mt-3 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:ring-sky-800" />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Password</span>
            <input type="password" placeholder="••••••••" className="mt-3 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:ring-sky-800" />
          </label>
          <button className="w-full rounded-3xl bg-slate-900 px-5 py-4 text-base font-semibold text-white transition hover:bg-slate-800 dark:bg-sky-500 dark:text-slate-950 dark:hover:bg-sky-400">Create account</button>
        </div>
        <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
          Already have an account? <Link to="/login" className="font-semibold text-slate-900 transition hover:text-sky-600 dark:text-slate-100">Log in</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
