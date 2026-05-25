import { Star } from 'lucide-react';
import { formatCurrency, formatPercent } from '../utils/format.js';

function Watchlist({ coins, watchlist, removeFromWatchlist }) {
  const watchlistCoins = coins.filter((coin) => watchlist.includes(coin.id));

  return (
    <div className="card-glass p-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold">Watchlist</h3>
          <p className="mt-1 text-sm text-slate-400">Monitor your favorite coins in one place.</p>
        </div>
        <Star className="text-brand" />
      </div>
      <div className="mt-6 space-y-3">
        {watchlistCoins.length === 0 ? (
          <div className="rounded-3xl border border-slate-700/70 bg-slate-950/80 p-6 text-center text-slate-400">
            Add coins to your watchlist from the markets table to see them here.
          </div>
        ) : (
          watchlistCoins.map((coin) => (
            <div key={coin.id} className="rounded-3xl border border-slate-700/70 bg-slate-950/80 p-4">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-semibold text-slate-100">{coin.name}</p>
                  <p className="text-sm text-slate-500">{coin.symbol.toUpperCase()}</p>
                </div>
                <div className="flex items-center gap-4 text-right">
                  <div>
                    <p className="font-semibold text-slate-100">{formatCurrency(coin.current_price)}</p>
                    <p className={`text-sm ${coin.price_change_percentage_24h >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {formatPercent(coin.price_change_percentage_24h)}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFromWatchlist(coin.id)}
                    className="rounded-full bg-rose-500 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-rose-400"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Watchlist;
