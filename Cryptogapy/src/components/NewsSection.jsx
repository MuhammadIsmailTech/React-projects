function NewsSection({ news }) {
  return (
    <div className="card-glass p-6">
      <div>
        <h3 className="text-xl font-semibold">Latest Blockchain News</h3>
        <p className="mt-1 text-sm text-slate-400">Fresh headlines from the crypto ecosystem.</p>
      </div>
      <div className="mt-6 space-y-4">
        {news.map((item) => (
          <article key={item.title} className="rounded-3xl border border-slate-700/80 bg-slate-950/75 p-5 transition hover:border-brand/60 hover:bg-slate-900/80">
            <h4 className="font-semibold text-slate-100">{item.title}</h4>
            <div className="mt-3 flex items-center justify-between text-sm text-slate-500">
              <span>{item.source}</span>
              <span>{item.time}</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default NewsSection;
