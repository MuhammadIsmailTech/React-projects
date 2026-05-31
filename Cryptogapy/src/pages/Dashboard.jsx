import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Bell, Menu, Plus, Minus, Download, ShoppingBag, Home, Layers, TrendingUp, CreditCard, Star } from 'lucide-react';
import { useAppContext } from '../context/AppContext.jsx';
import StatsCard from '../components/StatsCard.jsx';
import CryptoTable from '../components/CryptoTable.jsx';
import TrendSection from '../components/TrendSection.jsx';
import NewsSection from '../components/NewsSection.jsx';
import Watchlist from '../components/Watchlist.jsx';
import CryptoConverter from '../components/CryptoConverter.jsx';
import { formatCurrency, formatCurrencyCompact, formatPercent } from '../utils/format.js';

function Dashboard() {
  const { coins, trending, loading, error, dummyData, watchlist, removeFromWatchlist, searchQuery, setSearchQuery } = useAppContext();

  const portfolioValue = dummyData.user.balance;
  const profitValue = dummyData.user.profit;
  const totalVolume = coins.reduce((sum, coin) => sum + (coin.total_volume || 0), 0);
  const watchlistCoins = coins.filter((coin) => watchlist.includes(coin.id)).slice(0, 4);

  const topGainers = coins
    .filter((coin) => coin.price_change_percentage_24h !== null)
    .sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h)
    .slice(0, 4);

  const topLosers = coins
    .filter((coin) => coin.price_change_percentage_24h !== null)
    .sort((a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h)
    .slice(0, 4);

  const filteredCoins = coins.filter((coin) => {
    const query = searchQuery.toLowerCase();
    return coin.name.toLowerCase().includes(query) || coin.symbol.toLowerCase().includes(query);
  });

  const actionButtons = [
    { label: 'Buy', icon: Plus, color: 'bg-cyan-500 text-slate-950' },
    { label: 'Sell', icon: Minus, color: 'bg-slate-900/90 text-slate-100' },
    { label: 'Deposit', icon: Download, color: 'bg-slate-900/90 text-slate-100' },
    { label: 'Pay', icon: ShoppingBag, color: 'bg-slate-900/90 text-slate-100' }
  ];

  const sparklinePath = 'M2 15 L14 10 L26 12 L38 8 L50 11 L62 7 L74 4';

  const bottomNav = [
    { label: 'Home', icon: Home },
    { label: 'Accounts', icon: Layers },
    { label: 'Trade', icon: TrendingUp },
    { label: 'Track', icon: Star },
    { label: 'Card', icon: CreditCard }
  ];

  return (
    <div className="mx-auto max-w-4xl space-y-6 pb-28 sm:pb-12">
      <motion.section initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="relative card-glass overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/90 p-5 shadow-glass">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-10 -left-10 h-48 w-48 rounded-full bg-cyan-500/15 blur-3xl" />
          <div className="absolute -bottom-16 right-0 h-56 w-56 rounded-full bg-slate-700/15 blur-3xl" />
        </div>

        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <button className="inline-flex h-12 w-12 items-center justify-center rounded-3xl border border-slate-700/80 bg-slate-900/80 text-slate-200 transition hover:border-cyan-400">
            <Menu size={18} />
          </button>

          <div className="flex flex-1 items-center justify-center gap-2 overflow-x-auto rounded-full border border-slate-700/80 bg-slate-900/80 px-2 py-2 text-sm text-slate-300 sm:max-w-xl">
            <button className="rounded-full bg-cyan-500 px-4 py-2 text-slate-950 shadow-sm shadow-cyan-500/20">Buy</button>
            <button className="rounded-full px-4 py-2 transition hover:bg-slate-800/90 hover:text-white">Earn</button>
            <button className="rounded-full px-4 py-2 transition hover:bg-slate-800/90 hover:text-white">NFT</button>
          </div>

          <button className="inline-flex h-12 items-center gap-2 rounded-3xl border border-slate-700/80 bg-slate-900/80 px-4 text-sm text-slate-200 transition hover:border-cyan-400">
            <Bell size={18} />
            Missions
          </button>
        </div>

        <div className="mt-8 rounded-[2rem] border border-slate-700/70 bg-slate-900/90 p-6 shadow-soft sm:p-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Total Balance</p>
                <h1 className="mt-3 text-4xl font-semibold sm:text-5xl">{formatCurrency(portfolioValue)} USD</h1>
                <p className="mt-2 text-sm text-slate-400">Available balance across your crypto accounts.</p>
              </div>
              <div className="rounded-3xl bg-slate-950/80 px-4 py-3 text-right">
                <p className="text-sm text-slate-400">24h Change</p>
                <p className="mt-2 text-2xl font-semibold text-emerald-400">+{formatPercent(profitValue)}</p>
              </div>
            </div>

            <div className="mt-6 grid gap-3 rounded-[2rem] border border-slate-800/80 bg-slate-950/80 p-4 text-sm text-slate-300 sm:grid-cols-3">
              <div className="rounded-3xl bg-slate-900/90 p-4">
                <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Portfolio</p>
                <p className="mt-3 text-lg font-semibold text-slate-100">{formatCurrencyCompact(totalVolume)}</p>
              </div>
              <div className="rounded-3xl bg-slate-900/90 p-4">
                <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Last 24h</p>
                <p className="mt-3 text-lg font-semibold text-emerald-400">+3.28%</p>
              </div>
              <div className="rounded-3xl bg-slate-900/90 p-4">
                <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Net gain</p>
                <p className="mt-3 text-lg font-semibold text-slate-100">+$408</p>
              </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-4">
          {actionButtons.map((button) => {
            const Icon = button.icon;
            return (
              <button key={button.label} className={`flex flex-col items-center justify-center gap-2 rounded-3xl p-4 text-sm font-semibold shadow-soft transition ${button.color}`}>
                <span className="flex h-12 w-12 items-center justify-center rounded-3xl bg-white/10 text-slate-100">
                  <Icon size={18} />
                </span>
                {button.label}
              </button>
            );
          })}
        </div>
      </motion.section>

      <motion.section initial={{ y: 20, opacity: 0, delay: 0.05 }} animate={{ y: 0, opacity: 1 }} className="card-glass p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold">Favorites</h2>
            <p className="mt-1 text-sm text-slate-400">Your top coins from the watchlist.</p>
          </div>
          <Link to="/dashboard" className="text-sm text-cyan-300 transition hover:text-white">See All</Link>
        </div>

        <div className="mt-6 space-y-4">
          {watchlistCoins.length > 0 ? (
            watchlistCoins.map((coin) => (
              <div key={coin.id} className="grid gap-4 rounded-3xl border border-slate-700/80 bg-slate-950/85 p-4 sm:grid-cols-[1.3fr_1fr_0.9fr] sm:items-center">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-slate-900/90 text-slate-100">
                    {coin.symbol.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-100">{coin.name}</p>
                    <p className="text-sm text-slate-400">{coin.symbol.toUpperCase()}</p>
                  </div>
                </div>
                <div className="overflow-hidden rounded-3xl bg-slate-900/90 p-3">
                  <svg viewBox="0 0 76 24" className="h-14 w-full">
                    <defs>
                      <linearGradient id={`spark-${coin.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#34d399" />
                        <stop offset="100%" stopColor="#38bdf8" />
                      </linearGradient>
                    </defs>
                    <path d={sparklinePath} fill="none" stroke="url(#spark-${coin.id})" strokeWidth="2.2" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-slate-100">{formatCurrency(coin.current_price || coin.price || 0)}</p>
                  <p className={`text-sm ${((coin.price_change_percentage_24h || coin.change || 0) >= 0) ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {((coin.price_change_percentage_24h || coin.change || 0) >= 0 ? '+' : '')}{formatPercent(coin.price_change_percentage_24h || coin.change || 0)}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="rounded-3xl border border-slate-700/80 bg-slate-950/85 p-6 text-center text-slate-400">No favorites yet. Add coins from the market list.</div>
          )}
        </div>
      </motion.section>

      <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card-glass p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold">Market prices</h2>
              <p className="text-sm text-slate-400">Live crypto prices updated from CoinGecko API.</p>
            </div>
            <div className="relative w-full max-w-md">
              <label className="sr-only" htmlFor="market-search">Search coins</label>
              <input
                id="market-search"
                className="w-full rounded-3xl border border-slate-700/80 bg-slate-950/80 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-cyan-400"
                placeholder="Search BTC, ETH, ADA..."
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
              />
            </div>
          </div>

          <div className="mt-6">
            {error && <p className="rounded-3xl border border-rose-500/20 bg-rose-500/10 p-4 text-sm text-rose-200">{error}</p>}
            <CryptoTable coins={filteredCoins} loading={loading} />
          </div>
        </motion.section>

        <motion.div initial={{ opacity: 0, y: 20, delay: 0.1 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <TrendSection coins={trending.slice(0, 4)} />
          <NewsSection news={dummyData.news} />
          <Watchlist coins={coins} watchlist={watchlist} removeFromWatchlist={removeFromWatchlist} />
          <CryptoConverter />
        </motion.div>
      </div>

      <nav className="fixed bottom-0 left-0 right-0 z-50 mx-auto flex max-w-4xl items-center justify-between gap-2 rounded-t-[2rem] border border-slate-800/80 bg-slate-950/95 px-4 py-3 shadow-2xl shadow-slate-950/40 backdrop-blur-xl sm:hidden">
        {bottomNav.map((item) => {
          const Icon = item.icon;
          return (
            <button key={item.label} className="group flex flex-1 flex-col items-center justify-center gap-2 rounded-3xl px-2 py-2 text-xs text-slate-400 transition hover:bg-slate-900/90 hover:text-white">
              <Icon size={18} className="text-slate-400 transition group-hover:text-white" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}

export default Dashboard;
