import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function Cart() {
  const { cartItems, cartTotal, updateQuantity, removeFromCart } = useCart();

  return (
    <div className="mx-auto max-w-6xl pb-16">
      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-sky-600 dark:text-sky-300">Your bag</p>
          <h1 className="text-4xl font-semibold text-slate-900 dark:text-slate-100">Shopping cart</h1>
        </div>
        <Link to="/products" className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-sky-500 dark:text-slate-950 dark:hover:bg-sky-400">
          Continue shopping
        </Link>
      </div>
      {cartItems.length === 0 ? (
        <div className="rounded-[2rem] border border-dashed border-slate-300 bg-white p-12 text-center text-slate-500 shadow-soft dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
          Your cart is empty. Add some products to continue.
        </div>
      ) : (
        <div className="grid gap-8 xl:grid-cols-[1.4fr_0.6fr]">
          <div className="space-y-6">
            {cartItems.map((item) => (
              <div key={item.id} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <img src={item.image} alt={item.title} className="h-32 w-32 flex-none rounded-3xl object-cover" />
                  <div className="flex-1 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">{item.title}</h2>
                      <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">${item.price}</p>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Category: {item.category}</p>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="rounded-full border border-slate-200 bg-slate-100 px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                      >
                        -
                      </button>
                      <span className="w-10 text-center text-sm font-semibold text-slate-900 dark:text-slate-100">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="rounded-full border border-slate-200 bg-slate-100 px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="mt-4 rounded-2xl text-sm font-semibold text-red-600 transition hover:text-red-500 dark:text-red-400"
                >
                  Remove item
                </button>
              </div>
            ))}
          </div>

          <aside className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-soft dark:border-slate-800 dark:bg-slate-900">
            <p className="text-sm uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">Order summary</p>
            <div className="mt-6 space-y-3 text-slate-700 dark:text-slate-200">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500 dark:text-slate-400">Items</span>
                <span>{cartItems.length}</span>
              </div>
              <div className="flex items-center justify-between text-lg font-semibold">
                <span>Total</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
            </div>
            <Link
              to="/checkout"
              className="mt-6 inline-flex w-full justify-center rounded-3xl bg-slate-900 px-5 py-4 text-base font-semibold text-white transition hover:bg-slate-800 dark:bg-sky-500 dark:text-slate-950 dark:hover:bg-sky-400"
            >
              Proceed to checkout
            </Link>
          </aside>
        </div>
      )}
    </div>
  );
}

export default Cart;
