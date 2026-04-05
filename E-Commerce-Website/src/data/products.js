const defaultProducts = [
  {
    id: '1',
    title: 'Luxe Leather Jacket',
    category: 'Men',
    price: 149,
    rating: 4.8,
    reviews: 32,
    reviewSamples: [
      { id: 'r1', name: 'Clara M.', rating: 5, comment: 'The fit is amazing and the leather feels premium.', date: '2026-03-04' },
      { id: 'r2', name: 'Mark S.', rating: 4, comment: 'Great jacket, a bit pricey but worth it.', date: '2026-02-18' }
    ],
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80',
    description: 'A premium leather jacket with a modern tailored fit and soft lining for everyday wear.',
    tags: ['Trending', 'Featured']
  }
];

const loadProducts = () => {
  try {
    const stored = localStorage.getItem('shoply-products');
    return stored ? JSON.parse(stored) : defaultProducts;
  } catch {
    return defaultProducts;
  }
};

const saveProducts = (products) => {
  localStorage.setItem('shoply-products', JSON.stringify(products));
};

export { loadProducts, saveProducts };
export default loadProducts();