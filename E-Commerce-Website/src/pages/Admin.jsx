import { useState } from 'react';
import { useCart } from '../context/CartContext';

function Admin() {
  const { products, orders, addProduct, updateProduct, deleteProduct } = useCart();
  const [productForm, setProductForm] = useState({
    title: '',
    category: 'Men',
    price: '',
    rating: 5,
    reviews: 0,
    image: '',
    description: '',
    tags: ''
  });
  const [editingId, setEditingId] = useState(null);

  const handleProductSubmit = (e) => {
    e.preventDefault();
    const product = {
      ...productForm,
      price: Number(productForm.price),
      rating: Number(productForm.rating),
      reviews: Number(productForm.reviews),
      tags: productForm.tags.split(',').map(tag => tag.trim())
    };

    if (editingId) {
      updateProduct(editingId, product);
      setEditingId(null);
    } else {
      addProduct(product);
    }

    setProductForm({
      title: '',
      category: 'Men',
      price: '',
      rating: 5,
      reviews: 0,
      image: '',
      description: '',
      tags: ''
    });
  };

  const handleEdit = (product) => {
    setProductForm({
      title: product.title,
      category: product.category,
      price: product.price.toString(),
      rating: product.rating.toString(),
      reviews: product.reviews.toString(),
      image: product.image,
      description: product.description,
      tags: product.tags.join(', ')
    });
    setEditingId(product.id);
  };

  return (
    <div className="mx-auto max-w-7xl space-y-10 pb-16">
      <div className="mb-10">
        <p className="text-sm uppercase tracking-[0.25em] text-sky-600 dark:text-sky-300">Admin Dashboard</p>
        <h1 className="text-4xl font-semibold text-slate-900 dark:text-slate-100">Manage Your Business</h1>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-soft dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-6">
            {editingId ? 'Edit Product' : 'Add New Product'}
          </h2>
          <form onSubmit={handleProductSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                type="text"
                placeholder="Product Title"
                value={productForm.title}
                onChange={(e) => setProductForm({ ...productForm, title: e.target.value })}
                required
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:ring-sky-800"
              />
              <select
                value={productForm.category}
                onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:ring-sky-800"
              >
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Electronics">Electronics</option>
                <option value="Home">Home</option>
              </select>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <input
                type="number"
                placeholder="Price"
                value={productForm.price}
                onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                required
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:ring-sky-800"
              />
              <input
                type="number"
                step="0.1"
                placeholder="Rating"
                value={productForm.rating}
                onChange={(e) => setProductForm({ ...productForm, rating: e.target.value })}
                required
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:ring-sky-800"
              />
              <input
                type="number"
                placeholder="Reviews"
                value={productForm.reviews}
                onChange={(e) => setProductForm({ ...productForm, reviews: e.target.value })}
                required
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:ring-sky-800"
              />
            </div>
            <input
              type="url"
              placeholder="Image URL"
              value={productForm.image}
              onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
              required
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:ring-sky-800"
            />
            <textarea
              placeholder="Description"
              value={productForm.description}
              onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
              required
              rows={3}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:ring-sky-800"
            />
            <input
              type="text"
              placeholder="Tags (comma separated)"
              value={productForm.tags}
              onChange={(e) => setProductForm({ ...productForm, tags: e.target.value })}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:ring-sky-800"
            />
            <button
              type="submit"
              className="w-full rounded-3xl bg-slate-900 px-5 py-4 text-base font-semibold text-white transition hover:bg-slate-800 dark:bg-sky-500 dark:text-slate-950 dark:hover:bg-sky-400"
            >
              {editingId ? 'Update Product' : 'Add Product'}
            </button>
          </form>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-soft dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-6">Product Inventory</h2>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {products.map((product) => (
              <div key={product.id} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-950">
                <div className="flex items-center gap-4">
                  <img src={product.image} alt={product.title} className="h-12 w-12 rounded-xl object-cover" />
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-slate-100">{product.title}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">${product.price}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(product)}
                    className="rounded-2xl bg-sky-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-sky-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteProduct(product.id)}
                    className="rounded-2xl bg-red-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-red-500"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-soft dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-6">Recent Orders</h2>
        <div className="space-y-4">
          {orders.length === 0 ? (
            <p className="text-slate-500 dark:text-slate-400">No orders yet.</p>
          ) : (
            orders.slice(-5).reverse().map((order) => (
              <div key={order.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-950">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-semibold text-slate-900 dark:text-slate-100">{order.customer.name}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{new Date(order.date).toLocaleDateString()}</p>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 mb-2">{order.customer.email}</p>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {order.items.length} items • {order.paymentMethod}
                  </p>
                  <p className="font-semibold text-slate-900 dark:text-slate-100">${order.total.toFixed(2)}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Admin;