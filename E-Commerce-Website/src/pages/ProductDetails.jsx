import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, wishlistItems, products } = useCart();
  const product = products.find((item) => item.id === id);

  const isWishlisted = wishlistItems.some((item) => item.id === id);

  const [reviewForm, setReviewForm] = useState({ name: '', rating: 5, comment: '' });
  const [reviews, setReviews] = useState(() => {
    try {
      const stored = localStorage.getItem(`shoply-reviews-${id}`);
      return stored ? JSON.parse(stored) : product?.reviewSamples || [];
    } catch {
      return product?.reviewSamples || [];
    }
  });

  useEffect(() => {
    localStorage.setItem(`shoply-reviews-${id}`, JSON.stringify(reviews));
  }, [id, reviews]);

  const averageRating = useMemo(() => {
    if (reviews.length === 0) return product?.rating ?? 0;
    return reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  }, [product, reviews]);

  if (!product) {
    return (
      <div className="mx-auto max-w-4xl py-24 text-center">
        <p className="text-xl font-semibold text-slate-900 dark:text-slate-100">Product not found.</p>
      </div>
    );
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    setReviews((current) => [
      ...current,
      {
        id: Date.now().toString(),
        name: reviewForm.name || 'Guest Shopper',
        rating: Number(reviewForm.rating),
        comment: reviewForm.comment,
        date: new Date().toLocaleDateString()
      }
    ]);
    setReviewForm({ name: '', rating: 5, comment: '' });
  };

  return (
    <div className="mx-auto max-w-6xl space-y-10 pb-16">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_0.6fr] lg:items-start">
        <div className="space-y-6 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
          <img src={product.image} alt={product.title} className="h-[420px] w-full rounded-[1.75rem] object-cover" />
          <div className="grid gap-4 sm:grid-cols-3">
            {[product.image, product.image, product.image].map((src, index) => (
              <img key={index} src={src} alt={`${product.title} ${index}`} className="h-24 w-full rounded-3xl object-cover" />
            ))}
          </div>
        </div>

        <div className="space-y-6 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-soft dark:border-slate-800 dark:bg-slate-900">
          <span className="inline-flex rounded-full bg-sky-100 px-3 py-1 text-sm font-semibold uppercase tracking-[0.2em] text-sky-700 dark:bg-sky-900/30 dark:text-sky-200">
            {product.category}
          </span>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-semibold text-slate-900 dark:text-slate-100">{product.title}</h1>
              <button
                onClick={() => toggleWishlist(product)}
                className={`rounded-3xl border px-4 py-3 text-sm font-semibold transition ${isWishlisted ? 'border-pink-500 bg-pink-100 text-pink-600 dark:border-pink-400 dark:bg-pink-950/40 dark:text-pink-200' : 'border-slate-200 bg-slate-50 text-slate-900 hover:border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-slate-600'}`}
              >
                {isWishlisted ? 'Saved' : 'Add to wishlist'}
              </button>
            </div>
            <p className="text-2xl font-semibold text-slate-900 dark:text-slate-100">${product.price}</p>
            <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
              <span className="font-semibold text-slate-900 dark:text-slate-100">⭐ {averageRating.toFixed(1)}</span>
              <span>•</span>
              <span>{reviews.length} reviews</span>
            </div>
          </div>
          <p className="text-slate-600 dark:text-slate-300">{product.description}</p>
          <div className="space-y-4">
            <button
              onClick={() => {
                addToCart(product, 1);
                navigate('/cart');
              }}
              className="inline-flex w-full items-center justify-center rounded-3xl bg-slate-900 px-5 py-4 text-base font-semibold text-white transition hover:bg-slate-800 dark:bg-sky-500 dark:text-slate-950 dark:hover:bg-sky-400"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>

      <section className="space-y-8">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-soft dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Product details</h2>
          <div className="mt-6 space-y-4 text-slate-600 dark:text-slate-300">
            <p>Discover sleek design and premium materials with a comfortable fit built for everyday wear.</p>
            <p>Perfect for gifting or upgrading your wardrobe, this product is polished, practical, and versatile.</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">Free delivery when your order is over $75, plus easy returns within 30 days.</p>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[0.66fr_0.34fr]">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-soft dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Customer reviews</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">Share your experience or browse recent feedback.</p>
              </div>
              <div className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-900 dark:bg-slate-950 dark:text-slate-100">
                {reviews.length} total
              </div>
            </div>
            <div className="space-y-5">
              {reviews.length === 0 ? (
                <p className="text-slate-500 dark:text-slate-400">No reviews yet. Be the first to leave feedback.</p>
              ) : (
                reviews.map((review) => (
                  <div key={review.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <p className="font-semibold text-slate-900 dark:text-slate-100">{review.name}</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">{review.date}</p>
                    </div>
                    <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">⭐ {review.rating}</p>
                    <p className="mt-3 text-slate-600 dark:text-slate-300">{review.comment}</p>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-soft dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Leave a review</h2>
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <label className="block">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Name</span>
                <input
                  name="name"
                  value={reviewForm.name}
                  onChange={(event) => setReviewForm({ ...reviewForm, name: event.target.value })}
                  className="mt-3 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:ring-sky-800"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Rating</span>
                <select
                  name="rating"
                  value={reviewForm.rating}
                  onChange={(event) => setReviewForm({ ...reviewForm, rating: event.target.value })}
                  className="mt-3 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:ring-sky-800"
                >
                  <option value={5}>5 stars</option>
                  <option value={4}>4 stars</option>
                  <option value={3}>3 stars</option>
                  <option value={2}>2 stars</option>
                  <option value={1}>1 star</option>
                </select>
              </label>
              <label className="block">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Review</span>
                <textarea
                  name="comment"
                  value={reviewForm.comment}
                  onChange={(event) => setReviewForm({ ...reviewForm, comment: event.target.value })}
                  rows={4}
                  required
                  className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:ring-sky-800"
                />
              </label>
              <button type="submit" className="w-full rounded-3xl bg-slate-900 px-5 py-4 text-base font-semibold text-white transition hover:bg-slate-800 dark:bg-sky-500 dark:text-slate-950 dark:hover:bg-sky-400">
                Submit review
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProductDetails;
