import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';

const categories = [
  { title: 'Men', description: 'Bold essentials for everyday style', color: 'from-sky-500 to-indigo-600' },
  { title: 'Women', description: 'Modern silhouettes and cozy staples', color: 'from-rose-500 to-pink-600' },
  { title: 'Electronics', description: 'Smart gear for work and play', color: 'from-emerald-500 to-teal-600' },
  { title: 'Home', description: 'Lifestyle pieces to refresh your space', color: 'from-orange-500 to-amber-600' }
];

function Home() {
  const { products } = useCart();
  const featured = products.slice(0, 4);
  const trending = products.filter((item) => item.tags.includes('Trending'));

  return (
    <div className="mx-auto max-w-7xl space-y-16 pb-16">
      <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="space-y-6">
          <span className="inline-flex rounded-full bg-sky-100 px-4 py-1 text-sm font-semibold text-sky-700 dark:bg-sky-900/30 dark:text-sky-200">
            Spring sale - up to 40% off
          </span>
          <div className="space-y-4">
            <h1 className="text-4xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl">
              Find your next favorite product with effortless style.
            </h1>
            <p className="max-w-2xl text-slate-600 dark:text-slate-300">
              Shoply brings modern essentials, smart electronics, and curated fashion into one responsive storefront.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/products" className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-sky-500 dark:text-slate-950 dark:hover:bg-sky-400">
              Shop all products
            </Link>
            <a href="#featured" className="rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 dark:border-slate-700 dark:text-slate-200">
              View featured
            </a>
          </div>
        </div>
        <div className="rounded-[2rem] bg-gradient-to-br from-sky-600 to-indigo-700 p-8 text-white shadow-soft">
          <p className="text-sm uppercase tracking-[0.25em] text-sky-100/80">Unlimited deals</p>
          <h2 className="mt-4 text-3xl font-semibold">Fast delivery, premium packaging, and curated picks.</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl bg-white/10 p-4">
              <p className="text-sm text-sky-100/80">Free shipping</p>
              <p className="mt-2 text-lg font-semibold">On orders over $75</p>
            </div>
            <div className="rounded-3xl bg-white/10 p-4">
              <p className="text-sm text-sky-100/80">Easy returns</p>
              <p className="mt-2 text-lg font-semibold">30-day policy</p>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-6" id="featured">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-sky-600 dark:text-sky-300">Featured</p>
            <h2 className="text-3xl font-semibold text-slate-900 dark:text-slate-100">Popular picks</h2>
          </div>
          <Link to="/products" className="text-sm font-semibold text-slate-600 transition hover:text-sky-600 dark:text-slate-300">
            Browse the full collection →
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="space-y-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((item) => (
            <div key={item.title} className={`rounded-[2rem] p-6 text-white shadow-soft bg-gradient-to-br ${item.color}`}>
              <p className="text-sm uppercase tracking-[0.25em] text-sky-100/80">{item.title}</p>
              <p className="mt-4 text-lg font-semibold">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">Trending</p>
          <h2 className="text-3xl font-semibold text-slate-900 dark:text-slate-100">Hot right now</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {trending.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
