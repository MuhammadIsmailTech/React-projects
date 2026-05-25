import { useEffect, useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import { fetchCoinHistory } from '../services/api.js';
import { useAppContext } from '../context/AppContext.jsx';
import { formatCurrency, formatPercent, formatMarketCap } from '../utils/format.js';
import { motion } from 'framer-motion';

function CoinDetail() {
  const { id } = useParams();
  const { getCoinDetail, loading, error, theme } = useAppContext();
  const [coinDetail, setCoinDetail] = useState(null);
  const [history, setHistory] = useState(null);
  const [activeRange, setActiveRange] = useState('30');

  useEffect(() => {
    (async () => {
      const detail = await getCoinDetail(id);
      setCoinDetail(detail);
    })();
  }, [id]);

  useEffect(() => {
    async function loadHistory() {
      try {
        const chart = await fetchCoinHistory(id, activeRange);
        setHistory(chart);
      } catch (err) {
        console.error(err);
      }
    }
    loadHistory();
  }, [id, activeRange]);

  const chartData = useMemo(() => {
    if (!history) return null;
    return {
      labels: history.prices.map((point) => new Date(point[0]).toLocaleDateString()),
      datasets: [
        {
          label: 'Price USD',
          data: history.prices.map((point) => point[1]),
          borderColor: theme === 'light' ? '#0ea5e9' : '#7dd3fc',
          backgroundColor: 'rgba(59, 130, 246, 0.18)',
          fill: true,
          tension: 0.35,
          pointRadius: 0
        }
      ]
    };
  }, [history, theme]);

  if (loading || !coinDetail) {
    return <div className="card-glass p-8 text-center text-slate-400">Loading coin details...</div>;
  }

  if (error) {
    return <div className="card-glass p-8 text-center text-rose-300">{error}</div>;
  }

  return (
    <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="flex flex-col gap-6 rounded-[2rem] border border-slate-700/80 bg-slate-950/80 p-6 shadow-glass sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Coin Detail</p>
          <h1 className="mt-3 text-3xl font-semibold">{coinDetail.name} ({coinDetail.symbol.toUpperCase()})</h1>
          <p className="mt-3 max-w-2xl text-sm text-slate-400">{coinDetail.description.en.split('. ')[0] || 'Live price, market cap, and historical performance for this crypto asset.'}</p>
        </div>
        <div className="space-y-3 rounded-3xl border border-slate-700/80 bg-slate-900/75 p-5">
          <p className="text-sm text-slate-400">Current Price</p>
          <p className="text-3xl font-semibold">{formatCurrency(coinDetail.market_data.current_price.usd)}</p>
          <p className={`text-sm ${coinDetail.market_data.price_change_percentage_24h >= 0 ? 'text-emerald-300' : 'text-rose-300'}`}>
            {formatPercent(coinDetail.market_data.price_change_percentage_24h)} / 24h
          </p>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[2fr_1fr]">
        <section className="card-glass p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold">Live Price Chart</h2>
              <p className="mt-1 text-sm text-slate-400">Historical pricing data over the selected range.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {['7', '14', '30', '90'].map((range) => (
                <button
                  key={range}
                  onClick={() => setActiveRange(range)}
                  className={`rounded-2xl px-4 py-2 text-sm transition ${activeRange === range ? 'bg-brand text-slate-950' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
                >
                  {range}d
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 min-h-[280px] rounded-[2rem] border border-slate-700/70 bg-slate-950/80 p-4">
            {chartData ? <Line data={chartData} /> : <div className="flex h-72 items-center justify-center text-slate-500">Gathering chart data...</div>}
          </div>
        </section>

        <aside className="space-y-6">
          <section className="card-glass p-6">
            <h3 className="text-lg font-semibold">Market statistics</h3>
            <div className="mt-5 space-y-4 text-sm text-slate-300">
              <div className="flex items-center justify-between rounded-3xl border border-slate-700/70 bg-slate-900/80 p-4">
                <span>Market Cap</span>
                <strong>{formatMarketCap(coinDetail.market_data.market_cap.usd)}</strong>
              </div>
              <div className="flex items-center justify-between rounded-3xl border border-slate-700/70 bg-slate-900/80 p-4">
                <span>24h Volume</span>
                <strong>{formatMarketCap(coinDetail.market_data.total_volume.usd)}</strong>
              </div>
              <div className="flex items-center justify-between rounded-3xl border border-slate-700/70 bg-slate-900/80 p-4">
                <span>Circulating Supply</span>
                <strong>{coinDetail.market_data.circulating_supply.toLocaleString()}</strong>
              </div>
              <div className="flex items-center justify-between rounded-3xl border border-slate-700/70 bg-slate-900/80 p-4">
                <span>All-Time High</span>
                <strong>{formatCurrency(coinDetail.market_data.ath.usd)}</strong>
              </div>
            </div>
          </section>

          <Link to="/dashboard" className="block rounded-3xl border border-brand/40 bg-brand/10 px-6 py-4 text-center text-brand transition hover:bg-brand/20">Back to dashboard</Link>
        </aside>
      </div>

      <section className="card-glass p-6">
        <h3 className="text-xl font-semibold">About {coinDetail.name}</h3>
        <p className="mt-4 max-w-3xl leading-7 text-slate-300">{coinDetail.description.en.split('. ').slice(0, 3).join('. ')}.</p>
      </section>
    </motion.div>
  );
}

export default CoinDetail;
