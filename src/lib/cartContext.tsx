import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
  id: string; // unique item id (e.g. prodId-size)
  product_id: string;
  name: string;
  price: number;
  image_url: string;
  size: string;
  quantity: number;
  anime_series?: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: { _id?: string; id?: string; name: string; price: number; image_url: string; anime_series?: string }, size: string) => void;
  buyNow: (product: { _id?: string; id?: string; name: string; price: number; image_url: string; anime_series?: string }, size: string, navigate?: (path: string) => void) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  toastMessage: string | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('animeverse_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('animeverse_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cart]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const addToCart = (product: { _id?: string; id?: string; name: string; price: number; image_url: string; anime_series?: string }, size: string) => {
    const prodId = product._id || product.id || 'prod-' + Date.now();
    const itemId = `${prodId}-${size}`;
    const selectedSize = size || 'M';

    setCart(prev => {
      const existing = prev.find(item => item.id === itemId);
      if (existing) {
        return prev.map(item =>
          item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id: itemId,
          product_id: prodId,
          name: product.name,
          price: product.price,
          image_url: product.image_url,
          size: selectedSize,
          quantity: 1,
          anime_series: product.anime_series
        }
      ];
    });

    showToast(`Added ${product.name} (Size: ${selectedSize}) to cart!`);
  };

  const buyNow = (
    product: { _id?: string; id?: string; name: string; price: number; image_url: string; anime_series?: string },
    size: string,
    navigate?: (path: string) => void
  ) => {
    addToCart(product, size);
    setIsCartOpen(true);
    if (navigate) {
      navigate('/cart');
    }
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart(prev => prev.map(item => item.id === id ? { ...item, quantity } : item));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        buyNow,
        updateQuantity,
        removeFromCart,
        clearCart,
        cartCount,
        cartTotal,
        isCartOpen,
        setIsCartOpen,
        toastMessage
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
