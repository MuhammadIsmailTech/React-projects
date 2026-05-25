import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

function TrendSection({ coins }) {
  return (
    <div className="card-glass p-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold">Trending Cryptos</h3>
          <p className="mt-1 text-sm text-slate-400">Most searched tokens on the network right now.</p>
        </div>
      </div>
      <div className="mt-6 space-y-4">
        {coins.map((coin) => (
          <div key={coin.id} className="flex items-center justify-between rounded-3xl border border-slate-700/70 bg-slate-950/80 p-4">
            <div className="flex items-center gap-3">
              <img src={coin.small} alt={coin.name} className="h-10 w-10 rounded-full" />
              <div>
                <p className="font-semibold text-slate-100">{coin.name}</p>
                <p className="text-sm text-slate-400">{coin.symbol.toUpperCase()}</p>
              </div>
            </div>
            <span className="flex items-center gap-1 rounded-full bg-slate-900/90 px-3 py-2 text-sm text-slate-300">
              {coin.price_btc.toFixed(5)} BTC
              {coin.score > 4 ? <ArrowUpRight size={16} className="text-emerald-400" /> : <ArrowDownRight size={16} className="text-rose-400" />}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TrendSection;
