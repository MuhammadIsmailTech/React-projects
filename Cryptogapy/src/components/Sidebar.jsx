import { Link, useLocation } from 'react-router-dom';
import { BarChart3, Home, Layers, ShieldCheck, Star, TrendingUp } from 'lucide-react';
import { useAppContext } from '../context/AppContext.jsx';

const navItems = [
  { id: 'dashboard', href: '/dashboard', label: 'Dashboard', icon: Home },
  { id: 'markets', href: '/coin/bitcoin', label: 'Markets', icon: BarChart3 },
  { id: 'portfolio', href: '/dashboard', label: 'Portfolio', icon: Layers },
  { id: 'watchlist', href: '/dashboard', label: 'Watchlist', icon: Star },
  { id: 'security', href: '/dashboard', label: 'Security', icon: ShieldCheck }
];

function Sidebar() {
  const location = useLocation();
  const { theme } = useAppContext();

  return (
    <aside className={`hidden w-72 flex-col border-r border-slate-800/80 bg-slate-950/95 px-5 py-6 text-slate-100 md:flex ${theme === 'light' ? 'bg-white text-slate-900' : ''}`}>
      <div className="mb-12 flex items-center gap-3 px-1">
        <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-brand text-slate-950 shadow-soft">CZ</div>
        <div>
          <p className="text-sm uppercase tracking-[0.4em] text-slate-500">Cryptogapy</p>
          <h2 className="text-xl font-semibold">Trading Desk</h2>
        </div>
      </div>

      <nav className="space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = location.pathname.startsWith(item.href);
          return (
            <Link
              key={item.id}
              to={item.href}
              className={`flex items-center gap-3 rounded-3xl px-4 py-3 text-sm transition ${active ? 'bg-brand text-slate-950 shadow-soft' : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'}`}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto rounded-[2rem] border border-slate-700/80 bg-slate-900/85 p-5 text-sm text-slate-300 shadow-glass">
        <div className="flex items-center gap-3 rounded-3xl bg-slate-950/90 p-4">
          <TrendingUp className="text-cyan-300" />
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Market Pulse</p>
            <p className="mt-1 text-base font-semibold text-slate-100">Bitcoin waning yet momentum holds.</p>
          </div>
        </div>
        <p className="mt-4 text-xs leading-6 text-slate-400">A modern dashboard with responsive panels, live pricing, watchlist actions and premium glass UI.</p>
      </div>
    </aside>
  );
}

export default Sidebar;
