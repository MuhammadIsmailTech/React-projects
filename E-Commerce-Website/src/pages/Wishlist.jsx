import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function Wishlist() {
  const { wishlistItems, toggleWishlist, addToCart } = useCart();

  return (
    <div className="mx-auto max-w-7xl pb-16">
      <div className="mb-10">
        <p className="text-sm uppercase tracking-[0.25em] text-pink-600 dark:text-pink-300">Saved items</p>
        <h1 className="text-4xl font-semibold text-slate-900 dark:text-slate-100">Your wishlist</h1>
      </div>

      {wishlistItems.length === 0 ? (
        <div className="rounded-[2rem] border border-dashed border-slate-300 bg-white p-12 text-center text-slate-500 shadow-soft dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
          <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">No saved items yet.</p>
          <p className="mt-3">Browse products and save your favorites for later.</p>
          <Link to="/products" className="mt-6 inline-flex rounded-3xl bg-pink-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-pink-500">
            Shop products
          </Link>
        </div>
      ) : (
        <div className="grid gap-6">
          {wishlistItems.map((item) => (
            <div key={item.id} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
              <div className="grid gap-6 lg:grid-cols-[0.7fr_0.3fr] lg:items-center">
                <div className="flex items-center gap-4">
                  <img src={item.image} alt={item.title} className="h-32 w-32 rounded-3xl object-cover" />
                  <div>
                    <Link to={`/products/${item.id}`} className="text-xl font-semibold text-slate-900 transition hover:text-pink-600 dark:text-slate-100">
                      {item.title}
                    </Link>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{item.category}</p>
                    <p className="mt-1 text-lg font-semibold text-slate-900 dark:text-slate-100">${item.price}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => addToCart(item, 1)}
                    className="rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-sky-500 dark:text-slate-950 dark:hover:bg-sky-400"
                  >
                    Add to cart
                  </button>
                  <button
                    onClick={() => toggleWishlist(item)}
                    className="rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-pink-600 transition hover:border-pink-300 dark:border-slate-700 dark:text-pink-300"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;
