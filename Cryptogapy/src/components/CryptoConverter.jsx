import { useMemo, useState } from 'react';
import { formatCurrency, formatPercent } from '../utils/format.js';

const rates = {
  BTC: 0.000014,
  ETH: 0.00037,
  USDT: 1
};

function CryptoConverter() {
  const [amount, setAmount] = useState(1000);
  const [target, setTarget] = useState('BTC');

  const result = useMemo(() => {
    const numericAmount = Number(amount) || 0;
    return numericAmount * (rates[target] || 1);
  }, [amount, target]);

  return (
    <div className="card-glass p-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold">Crypto Converter</h3>
          <p className="mt-1 text-sm text-slate-400">Instantly convert USD to popular crypto tokens.</p>
        </div>
      </div>
      <div className="mt-6 space-y-4">
        <label className="block text-sm text-slate-300">
          Enter USD amount
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="mt-2 w-full rounded-3xl border border-slate-700/80 bg-slate-900/90 px-4 py-3 text-slate-100 outline-none transition focus:border-brand"
          />
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm text-slate-300">
            Convert to
            <select
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              className="mt-2 w-full rounded-3xl border border-slate-700/80 bg-slate-900/90 px-4 py-3 text-slate-100 outline-none transition focus:border-brand"
            >
              <option value="BTC">Bitcoin</option>
              <option value="ETH">Ethereum</option>
              <option value="USDT">Tether</option>
            </select>
          </label>
          <div className="rounded-3xl border border-slate-700/80 bg-slate-900/90 p-4 text-slate-100">
            <p className="text-sm text-slate-400">Estimated value</p>
            <p className="mt-4 text-3xl font-semibold">{formatCurrency(result)}</p>
            <p className="mt-1 text-sm text-slate-500">{formatPercent((result / amount - 1) * 100)} from USD</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CryptoConverter;
