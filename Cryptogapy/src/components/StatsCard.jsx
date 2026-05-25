function StatsCard({ title, amount, accent }) {
  return (
    <div className={`min-w-0 rounded-3xl border border-slate-700/80 bg-slate-950/80 p-6 shadow-soft`}>
      <p className="text-sm text-slate-400">{title}</p>
      <h3 className="mt-4 truncate text-3xl font-semibold text-white sm:text-4xl">{amount}</h3>
      <div className={`mt-5 h-2 rounded-full bg-gradient-to-r ${accent}`} />
    </div>
  );
}

export default StatsCard;
