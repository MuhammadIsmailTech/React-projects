import { Star } from 'lucide-react';
import { formatCurrency, formatPercent } from '../utils/format.js';

function Watchlist({ coins }) {
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
        {coins.map((coin) => (
          <div key={coin.id} className="rounded-3xl border border-slate-700/70 bg-slate-950/80 p-4">
            <div className="flex items-center justify-between gap-4 min-w-0">
              <div className="min-w-0">
                <p className="truncate font-semibold text-slate-100">{coin.name}</p>
                <p className="truncate text-sm text-slate-500">{coin.symbol}</p>
              </div>
              <div className="min-w-0 text-right">
                <p className="font-semibold text-slate-100">{formatCurrency(coin.price)}</p>
                <p className={`text-sm ${coin.change >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>{formatPercent(coin.change)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Watchlist;
