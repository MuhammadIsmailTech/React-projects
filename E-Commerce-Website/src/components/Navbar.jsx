import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useEffect, useState } from 'react';

const categories = ['Men', 'Women', 'Electronics', 'Home'];

function Navbar() {
  const { cartCount, wishlistCount } = useCart();
  const [theme, setTheme] = useState('light');
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const handleSearch = (event) => {
    event.preventDefault();
    if (query.trim()) {
      navigate(`/products?search=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur dark:border-slate-800/80 dark:bg-slate-950/95">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="text-xl font-semibold tracking-tight text-slate-900 transition hover:text-sky-600 dark:text-slate-100">
          Shoply
        </Link>

        <form onSubmit={handleSearch} className="hidden flex-1 items-center gap-2 md:flex">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products..."
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:ring-sky-800"
          />
          <button type="submit" className="rounded-2xl bg-sky-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-sky-500">
            Search
          </button>
        </form>

        <div className="hidden items-center gap-3 text-sm text-slate-600 dark:text-slate-300 md:flex">
          {categories.map((category) => (
            <NavLink
              key={category}
              to={`/products?category=${category}`}
              className={({ isActive }) =>
                `rounded-full px-3 py-1 transition ${isActive ? 'bg-sky-600 text-white' : 'hover:bg-slate-100 dark:hover:bg-slate-800'}`
              }
            >
              {category}
            </NavLink>
          ))}
        </div>

        <nav className="flex items-center gap-4">
          <button
            onClick={() => setTheme((current) => (current === 'light' ? 'dark' : 'light'))}
            className="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 transition hover:border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          >
            {theme === 'light' ? 'Dark' : 'Light'}
          </button>
          <NavLink to="/admin" className="hidden rounded-2xl border border-slate-200 bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 md:inline-flex">
            Admin
          </NavLink>
          <NavLink to="/wishlist" className="relative rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 transition hover:border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100">
            Wishlist
            {wishlistCount > 0 && (
              <span className="absolute -right-2 -top-2 inline-flex h-6 min-w-[24px] items-center justify-center rounded-full bg-pink-600 px-1.5 text-xs font-semibold text-white">
                {wishlistCount}
              </span>
            )}
          </NavLink>
          <NavLink to="/login" className="hidden rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 transition hover:border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 md:inline-flex">
            Login
          </NavLink>
          <NavLink to="/cart" className="relative rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 transition hover:border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100">
            Cart
            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 inline-flex h-6 min-w-[24px] items-center justify-center rounded-full bg-sky-600 px-1.5 text-xs font-semibold text-white">
                {cartCount}
              </span>
            )}
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
