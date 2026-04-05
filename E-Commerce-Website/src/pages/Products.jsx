import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';

const minPrice = 0;
const maxPrice = 250;
const categoryOptions = ['All', 'Men', 'Women', 'Electronics', 'Home'];
const ratingOptions = ['All', '4+', '4.5+', '5'];

function Products() {
  const { products } = useCart();
  const [searchParams, setSearchParams] = useSearchParams();
  const [category, setCategory] = useState('All');
  const [price, setPrice] = useState(maxPrice);
  const [rating, setRating] = useState('All');
  const [searchValue, setSearchValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const debounceRef = useRef(null);

  useEffect(() => {
    setCategory(searchParams.get('category') || 'All');
    setPrice(Number(searchParams.get('price')) || maxPrice);
    setRating(searchParams.get('rating') || 'All');
    setSearchValue(searchParams.get('search') || '');
  }, [searchParams]);

  const getSuggestions = useCallback((query) => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }
    const filtered = products
      .filter((product) => product.title.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 5)
      .map((product) => product.title);
    setSuggestions(filtered);
  }, [products]);

  const debouncedGetSuggestions = useCallback((query) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => getSuggestions(query), 300);
  }, [getSuggestions]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    debouncedGetSuggestions(value);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchValue(suggestion);
    setShowSuggestions(false);
    updateParam('search', suggestion);
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (category !== 'All' && product.category !== category) return false;
      if (rating !== 'All') {
        const threshold = Number(rating.replace('+', ''));
        if (product.rating < threshold) return false;
      }
      if (product.price > price) return false;
      if (searchValue && !product.title.toLowerCase().includes(searchValue.toLowerCase())) return false;
      return true;
    });
  }, [products, category, price, rating, searchValue]);

  const updateParam = (key, value) => {
    const params = Object.fromEntries(searchParams.entries());
    if (value && value !== 'All') {
      params[key] = value;
    } else {
      delete params[key];
    }
    setSearchParams(params);
  };

  return (
    <div className="mx-auto max-w-7xl space-y-10 pb-16">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-sky-600 dark:text-sky-300">Product collection</p>
          <h1 className="text-4xl font-semibold text-slate-900 dark:text-slate-100">Find what fits your style.</h1>
        </div>
        <p className="max-w-xl text-sm text-slate-600 dark:text-slate-400">Filter by category, price range, rating, and keywords. All products load dynamically from a shared catalog.</p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[280px_1fr]">
        <aside className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Filters</h2>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Category</label>
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                updateParam('category', e.target.value);
              }}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:ring-sky-800"
            >
              {categoryOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
              <span>Price range</span>
              <span>${price}</span>
            </div>
            <input
              type="range"
              min={minPrice}
              max={maxPrice}
              value={price}
              onChange={(e) => {
                setPrice(Number(e.target.value));
                updateParam('price', e.target.value);
              }}
              className="w-full accent-sky-600"
            />
          </div>
          <div className="space-y-3">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Rating</label>
            <select
              value={rating}
              onChange={(e) => {
                setRating(e.target.value);
                updateParam('rating', e.target.value);
              }}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:ring-sky-800"
            >
              {ratingOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
          <div className="space-y-3 relative">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Search</label>
            <input
              type="search"
              value={searchValue}
              placeholder="Search by title"
              onChange={handleSearchChange}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:ring-sky-800"
            />
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 z-10 mt-1 rounded-2xl border border-slate-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-900">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="w-full px-4 py-2 text-left text-sm hover:bg-slate-50 dark:hover:bg-slate-800 first:rounded-t-2xl last:rounded-b-2xl"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button
            onClick={() => {
              setCategory('All');
              setPrice(maxPrice);
              setRating('All');
              setSearchValue('');
              setSearchParams({});
            }}
            className="inline-flex w-full justify-center rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-sky-500 dark:text-slate-950 dark:hover:bg-sky-400"
          >
            Reset filters
          </button>
        </aside>

        <div className="space-y-6">
          <div className="flex items-center justify-between gap-4 rounded-3xl border border-slate-200 bg-white px-6 py-5 shadow-soft dark:border-slate-800 dark:bg-slate-900">
            <p className="text-sm text-slate-600 dark:text-slate-400">Showing {filteredProducts.length} products</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">Updated with live UI filters</p>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center text-slate-500 shadow-soft dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
              No products match those filters.
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Products;
