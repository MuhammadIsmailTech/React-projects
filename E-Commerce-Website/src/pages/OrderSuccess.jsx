import { Link } from 'react-router-dom';

function OrderSuccess() {
  return (
    <div className="mx-auto max-w-2xl pb-16 text-center">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-12 shadow-soft dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-3xl text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-200">
          ✓
        </div>
        <h1 className="text-4xl font-semibold text-slate-900 dark:text-slate-100">Order confirmed</h1>
        <p className="mt-4 text-slate-600 dark:text-slate-300">Thanks for your purchase! Your order is being prepared and will be shipped soon.</p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link to="/" className="rounded-3xl bg-slate-900 px-6 py-4 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-sky-500 dark:text-slate-950 dark:hover:bg-sky-400">
            Continue shopping
          </Link>
          <Link to="/products" className="rounded-3xl border border-slate-200 px-6 py-4 text-sm font-semibold text-slate-900 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-800">
            View more products
          </Link>
        </div>
      </div>
    </div>
  );
}

export default OrderSuccess;
