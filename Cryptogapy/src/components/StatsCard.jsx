function StatsCard({ title, amount, accent }) {
  return (
    <div className={`rounded-3xl border border-slate-700/80 bg-slate-950/80 p-6 shadow-soft`}>
      <p className="text-sm text-slate-400">{title}</p>
      <h3 className="mt-4 text-3xl font-semibold text-white">{amount}</h3>
      <div className={`mt-5 h-2 rounded-full bg-gradient-to-r ${accent}`} />
    </div>
  );
}

export default StatsCard;
