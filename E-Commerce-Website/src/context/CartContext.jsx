import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { loadProducts, saveProducts } from '../data/products';

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const stored = localStorage.getItem('shoply-cart');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [wishlistItems, setWishlistItems] = useState(() => {
    try {
      const stored = localStorage.getItem('shoply-wishlist');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [orders, setOrders] = useState(() => {
    try {
      const stored = localStorage.getItem('shoply-orders');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [products, setProducts] = useState(() => loadProducts());

  useEffect(() => {
    localStorage.setItem('shoply-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('shoply-wishlist', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  useEffect(() => {
    localStorage.setItem('shoply-orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    saveProducts(products);
  }, [products]);

  const addToCart = (product, quantity = 1) => {
    setCartItems((current) => {
      const existing = current.find((item) => item.id === product.id);
      if (existing) {
        return current.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...current, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((current) => current.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    setCartItems((current) =>
      current.map((item) =>
        item.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  const toggleWishlist = (product) => {
    setWishlistItems((current) => {
      const exists = current.some((item) => item.id === product.id);
      if (exists) {
        return current.filter((item) => item.id !== product.id);
      }
      return [...current, product];
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlistItems((current) => current.filter((item) => item.id !== productId));
  };

  const addProduct = (product) => {
    setProducts((current) => [...current, { ...product, id: Date.now().toString() }]);
  };

  const updateProduct = (id, updatedProduct) => {
    setProducts((current) => current.map((p) => (p.id === id ? { ...p, ...updatedProduct } : p)));
  };

  const deleteProduct = (id) => {
    setProducts((current) => current.filter((p) => p.id !== id));
  };

  const addOrder = (order) => {
    setOrders((current) => [...current, { ...order, id: Date.now().toString(), date: new Date().toISOString() }]);
  };

  const clearCart = () => setCartItems([]);

  const cartCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );

  const cartTotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems]
  );

  const wishlistCount = useMemo(() => wishlistItems.length, [wishlistItems]);

  const value = {
    cartItems,
    wishlistItems,
    orders,
    products,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    toggleWishlist,
    removeFromWishlist,
    addProduct,
    updateProduct,
    deleteProduct,
    addOrder,
    cartCount,
    cartTotal,
    wishlistCount
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
