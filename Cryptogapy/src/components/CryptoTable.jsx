import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAppContext } from '../context/AppContext.jsx';
import { formatCurrency, formatCurrencyCompact, formatMarketCap, formatPercent } from '../utils/format.js';

function CryptoTable({ coins, loading }) {
  const { watchlist, addToWatchlist, removeFromWatchlist } = useAppContext();

  if (loading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="h-24 rounded-3xl bg-slate-900/80 p-4 shadow-soft animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="space-y-4 rounded-[2rem] border border-slate-700/80 bg-slate-950/80 p-2 shadow-soft sm:hidden">
        {coins.slice(0, 6).map((coin) => {
          const inWatchlist = watchlist.includes(coin.id);
          return (
            <div key={coin.id} className="rounded-3xl border border-slate-700/80 bg-slate-950/85 p-4">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img src={coin.image} alt={coin.name} className="h-12 w-12 rounded-3xl" />
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-slate-100">{coin.name}</p>
                    <p className="truncate text-sm text-slate-400">{coin.symbol.toUpperCase()}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => (inWatchlist ? removeFromWatchlist(coin.id) : addToWatchlist(coin.id))}
                  className={`rounded-3xl px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition ${
                    inWatchlist ? 'bg-rose-500 text-white hover:bg-rose-400' : 'bg-emerald-600 text-white hover:bg-emerald-500'
                  }`}
                >
                  {inWatchlist ? 'Remove' : 'Watch'}
                </button>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-slate-400">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Price</p>
                  <p className="mt-1 font-semibold text-slate-100">{formatCurrency(coin.current_price)}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-500">24h</p>
                  <p className={`mt-1 font-semibold ${coin.price_change_percentage_24h >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {formatPercent(coin.price_change_percentage_24h)}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="hidden overflow-x-auto rounded-[2rem] border border-slate-700/80 bg-slate-950/80 shadow-soft sm:block">
        <div className="min-w-[980px]">
          <div className="grid grid-cols-[3fr_1fr_1fr_1fr_1fr_0.9fr] gap-4 border-b border-slate-800/80 bg-slate-900/85 px-6 py-4 text-sm uppercase tracking-[0.2em] text-slate-500">
            <span>Coin</span>
            <span>Price</span>
            <span>24h</span>
            <span>Market Cap</span>
            <span>Volume</span>
            <span className="text-right">Watchlist</span>
          </div>
          <div className="divide-y divide-slate-800/80">
            {coins.slice(0, 12).map((coin) => {
              const inWatchlist = watchlist.includes(coin.id);
              return (
                <motion.div
                  key={coin.id}
                  whileHover={{ scale: 1.01 }}
                  className="group grid min-w-0 grid-cols-[3fr_1fr_1fr_1fr_1fr_0.9fr] items-center gap-4 px-6 py-5 transition hover:bg-slate-900/70"
                >
                  <div className="flex min-w-0 items-center gap-4">
                    <Link to={`/coin/${coin.id}`} className="flex min-w-0 items-center gap-4 truncate">
                      <img src={coin.image} alt={coin.name} className="h-10 w-10 rounded-full" />
                      <div className="min-w-0">
                        <p className="truncate font-semibold text-slate-100">{coin.name}</p>
                        <p className="truncate text-sm text-slate-500">{coin.symbol.toUpperCase()}</p>
                      </div>
                    </Link>
                  </div>

                  <div className="min-w-0 font-semibold text-slate-100">{formatCurrency(coin.current_price)}</div>
                  <div className={`min-w-0 font-semibold ${coin.price_change_percentage_24h >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {formatPercent(coin.price_change_percentage_24h)}
                  </div>
                  <div className="min-w-0 text-sm text-slate-400">{formatMarketCap(coin.market_cap)}</div>
                  <div className="min-w-0 text-sm text-slate-400">{formatCurrencyCompact(coin.total_volume)}</div>
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => (inWatchlist ? removeFromWatchlist(coin.id) : addToWatchlist(coin.id))}
                      className={`inline-flex h-10 min-w-[100px] items-center justify-center rounded-3xl px-3 text-sm font-semibold transition ${
                        inWatchlist ? 'bg-rose-500 text-white hover:bg-rose-400' : 'bg-emerald-600 text-white hover:bg-emerald-500'
                      }`}
                    >
                      {inWatchlist ? 'Remove' : 'Watch'}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CryptoTable;
