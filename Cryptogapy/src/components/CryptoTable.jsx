import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { formatCurrency, formatPercent } from '../utils/format.js';

function CryptoTable({ coins, loading }) {
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
    <div className="overflow-hidden rounded-[2rem] border border-slate-700/80 bg-slate-950/80">
      <div className="grid grid-cols-[3fr_1fr_1fr_1fr_1fr] gap-4 border-b border-slate-800/80 bg-slate-900/85 px-6 py-4 text-sm uppercase tracking-[0.2em] text-slate-500">
        <span>Coin</span>
        <span>Price</span>
        <span>24h</span>
        <span>Market Cap</span>
        <span>Volume</span>
      </div>
      <div className="divide-y divide-slate-800/80">
        {coins.slice(0, 12).map((coin) => (
          <motion.div
            key={coin.id}
            whileHover={{ scale: 1.01 }}
            className="group flex items-center justify-between gap-4 px-6 py-5 transition hover:bg-slate-900/70"
          >
            <Link to={`/coin/${coin.id}`} className="flex items-center gap-4">
              <img src={coin.image} alt={coin.name} className="h-10 w-10 rounded-full" />
              <div>
                <p className="font-semibold text-slate-100">{coin.name}</p>
                <p className="text-sm text-slate-500">{coin.symbol.toUpperCase()}</p>
              </div>
            </Link>
            <p className="font-semibold text-slate-100">{formatCurrency(coin.current_price)}</p>
            <p className={`font-semibold ${coin.price_change_percentage_24h >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
              {formatPercent(coin.price_change_percentage_24h)}
            </p>
            <p className="text-sm text-slate-400">{formatCurrency(coin.market_cap)}</p>
            <p className="text-sm text-slate-400">{formatCurrency(coin.total_volume)}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default CryptoTable;
