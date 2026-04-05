import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function Checkout() {
  const { cartItems, cartTotal, clearCart, addOrder } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', address: '', phone: '', payment: 'cod' });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const order = {
      customer: form,
      items: cartItems,
      total: cartTotal,
      paymentMethod: form.payment
    };
    addOrder(order);
    clearCart();
    navigate('/order-success');
  };

  return (
    <div className="mx-auto max-w-6xl pb-16">
      <div className="mb-10">
        <p className="text-sm uppercase tracking-[0.25em] text-sky-600 dark:text-sky-300">Checkout</p>
        <h1 className="text-4xl font-semibold text-slate-900 dark:text-slate-100">Complete your order</h1>
      </div>
      <div className="grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
        <form onSubmit={handleSubmit} className="space-y-6 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-soft dark:border-slate-800 dark:bg-slate-900">
          <div className="grid gap-6 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Full name</span>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="mt-3 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:ring-sky-800"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Email</span>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                className="mt-3 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:ring-sky-800"
              />
            </label>
          </div>
          <label className="block">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Address</span>
            <input
              name="address"
              value={form.address}
              onChange={handleChange}
              required
              className="mt-3 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:ring-sky-800"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Phone</span>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
              className="mt-3 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:ring-sky-800"
            />
          </label>
          <div className="space-y-4 rounded-3xl bg-slate-50 p-6 dark:bg-slate-950">
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Payment method</p>
            <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
              <input type="radio" name="payment" value="cod" checked={form.payment === 'cod'} onChange={handleChange} />
              Cash on delivery
            </label>
            <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
              <input type="radio" name="payment" value="card" checked={form.payment === 'card'} onChange={handleChange} />
              Pay with card (UI only)
            </label>
          </div>
          <button type="submit" className="w-full rounded-3xl bg-slate-900 px-5 py-4 text-base font-semibold text-white transition hover:bg-slate-800 dark:bg-sky-500 dark:text-slate-950 dark:hover:bg-sky-400">
            Place order
          </button>
        </form>

        <aside className="space-y-6 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-soft dark:border-slate-800 dark:bg-slate-900">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">Order summary</p>
            <h2 className="mt-3 text-3xl font-semibold text-slate-900 dark:text-slate-100">${cartTotal.toFixed(2)}</h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{cartItems.length} items ready to ship.</p>
          </div>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-950">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-slate-100">{item.title}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-semibold text-slate-900 dark:text-slate-100">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}

export default Checkout;
