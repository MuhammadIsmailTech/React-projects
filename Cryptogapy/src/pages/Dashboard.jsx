import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext.jsx';
import StatsCard from '../components/StatsCard.jsx';
import CryptoTable from '../components/CryptoTable.jsx';
import TrendSection from '../components/TrendSection.jsx';
import NewsSection from '../components/NewsSection.jsx';
import Watchlist from '../components/Watchlist.jsx';
import CryptoConverter from '../components/CryptoConverter.jsx';
import { formatCurrency, formatCurrencyCompact, formatPercent } from '../utils/format.js';

function Dashboard() {
  const { coins, trending, loading, error, dummyData, watchlist, removeFromWatchlist, theme, searchQuery, setSearchQuery } = useAppContext();

  const portfolioValue = dummyData.user.balance;
  const profitValue = dummyData.user.profit;
  const totalVolume = coins.reduce((sum, coin) => sum + (coin.total_volume || 0), 0);

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

  return (
    <div className="space-y-6">
      <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <motion.section
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="card-glass p-6"
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Portfolio Balance</p>
              <h1 className="mt-3 text-4xl font-semibold">{formatCurrency(portfolioValue)}</h1>
              <p className="mt-3 text-sm text-slate-400">Your crypto ledger is updated live with market rates.</p>
            </div>
            <div className="rounded-3xl border border-slate-700/80 bg-slate-950/70 p-4 shadow-soft">
              <p className="text-sm text-slate-400">24h Profit/Loss</p>
              <h2 className="mt-2 text-3xl font-semibold text-emerald-400">{formatPercent(profitValue)}</h2>
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <StatsCard title="Total Value Locked" amount={formatCurrencyCompact(totalVolume)} accent="from-cyan-400 to-blue-600" />
            <StatsCard title="Active Watchlist" amount={watchlist.length} accent="from-fuchsia-500 to-violet-600" />
            <StatsCard title="Trending Now" amount={trending.length} accent="from-emerald-400 to-teal-500" />
          </div>
        </motion.section>

        <aside className="space-y-6">
          <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="card-glass p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Market Overview</p>
                <h2 className="mt-3 text-2xl font-semibold">Live snapshot</h2>
              </div>
              <span className="rounded-2xl bg-slate-800/90 px-3 py-2 text-xs uppercase tracking-[0.28em] text-slate-300">Live</span>
            </div>
            <div className="mt-6 grid gap-4">
              <div className="rounded-3xl border border-slate-700/80 bg-slate-950/75 p-4">
                <p className="text-sm text-slate-400">Bitcoin dominance</p>
                <p className="mt-2 text-3xl font-semibold">48.2%</p>
              </div>
              <div className="rounded-3xl border border-slate-700/80 bg-slate-950/75 p-4">
                <p className="text-sm text-slate-400">Active coins</p>
                <p className="mt-2 text-3xl font-semibold">{coins.length}</p>
              </div>
            </div>
          </motion.div>

          <Watchlist coins={coins} watchlist={watchlist} removeFromWatchlist={removeFromWatchlist} />
          <CryptoConverter />
        </aside>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <motion.section initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="card-glass p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Top Gainers</h2>
              <p className="mt-1 text-sm text-slate-400">Momentum leaders in the last 24 hours.</p>
            </div>
            <Link to="/dashboard" className="text-sm text-brand transition hover:text-cyan-300">View all</Link>
          </div>
          <div className="mt-6 grid gap-4">
            {topGainers.map((coin) => (
              <div key={coin.id} className="flex items-center justify-between rounded-3xl border border-slate-700/70 bg-slate-950/80 p-4">
                <div>
                  <p className="font-semibold">{coin.name}</p>
                  <p className="text-sm text-slate-400">{coin.symbol.toUpperCase()}</p>
                </div>
                <p className="text-lg font-semibold text-emerald-400">{formatPercent(coin.price_change_percentage_24h)}</p>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section initial={{ y: 20, opacity: 0, delay: 0.1 }} animate={{ y: 0, opacity: 1 }} className="card-glass p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Top Losers</h2>
              <p className="mt-1 text-sm text-slate-400">Potential opportunities and dips.</p>
            </div>
            <Link to="/dashboard" className="text-sm text-brand transition hover:text-cyan-300">View all</Link>
          </div>
          <div className="mt-6 grid gap-4">
            {topLosers.map((coin) => (
              <div key={coin.id} className="flex items-center justify-between rounded-3xl border border-slate-700/70 bg-slate-950/80 p-4">
                <div>
                  <p className="font-semibold">{coin.name}</p>
                  <p className="text-sm text-slate-400">{coin.symbol.toUpperCase()}</p>
                </div>
                <p className="text-lg font-semibold text-rose-400">{formatPercent(coin.price_change_percentage_24h)}</p>
              </div>
            ))}
          </div>
        </motion.section>
      </div>

      <div className="grid gap-6 xl:grid-cols-[2fr_1fr]">
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
                className="w-full rounded-3xl border border-slate-700/80 bg-slate-950/80 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-brand"
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
        </motion.div>
      </div>
    </div>
  );
}

export default Dashboard;
