import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="border-t border-slate-200/80 bg-white/90 px-4 py-8 text-slate-600 dark:border-slate-800/80 dark:bg-slate-950/95 dark:text-slate-400 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl text-center">
        <div className="flex flex-col gap-6 sm:flex-row sm:justify-between sm:text-left">
          <div>
            <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">Shoply</p>
            <p className="mt-2 text-sm">A polished shopping experience built with React and Tailwind CSS.</p>
          </div>
          <div className="grid gap-2 text-sm sm:text-right">
            <Link to="/products" className="transition hover:text-sky-600">Browse products</Link>
            <Link to="/cart" className="transition hover:text-sky-600">View cart</Link>
            <Link to="/checkout" className="transition hover:text-sky-600">Checkout</Link>
          </div>
        </div>
        <p className="mt-8 text-xs text-slate-500 dark:text-slate-500">© 2026 Shoply. Crafted for responsive commerce UI.</p>
      </div>
    </footer>
  );
}

export default Footer;
