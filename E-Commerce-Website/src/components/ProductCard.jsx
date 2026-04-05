import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function ProductCard({ product }) {
  const { wishlistItems, toggleWishlist } = useCart();
  const isWishlisted = wishlistItems.some((item) => item.id === product.id);

  const handleWishlist = (event) => {
    event.preventDefault();
    event.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <div className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-soft transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
      <div className="relative">
        <Link to={`/products/${product.id}`} className="block overflow-hidden">
          <img src={product.image} alt={product.title} className="h-64 w-full object-cover transition duration-500 group-hover:scale-105" />
        </Link>
        <button
          onClick={handleWishlist}
          className={`absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white bg-white/90 text-sm text-slate-900 shadow transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-950/90 dark:text-slate-100 ${isWishlisted ? 'text-pink-600' : ''}`}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          {isWishlisted ? '♥' : '♡'}
        </button>
      </div>
      <div className="space-y-3 p-5">
        <div className="flex items-center justify-between gap-3">
          <p className="rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-sky-700 dark:bg-sky-900/40 dark:text-sky-200">
            {product.category}
          </p>
          <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">${product.price}</p>
        </div>
        <Link to={`/products/${product.id}`} className="block text-lg font-semibold leading-tight text-slate-900 transition hover:text-sky-600 dark:text-slate-100">
          {product.title}
        </Link>
        <p className="text-sm text-slate-500 dark:text-slate-400">{product.description}</p>
        <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
          <span className="font-semibold text-slate-900 dark:text-slate-100">{product.rating}</span>
          <span>•</span>
          <span>{product.reviews} reviews</span>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
