import { useState, useEffectEvent } from 'react';
import { addToCart, getCartItems, removeFromCart } from '../api/cartApi';
import { CartContext } from './CartContext';

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const data = await getCartItems();
      setCartItems(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const addItem = async (event) => {
    try {
      await addToCart(event.id);
      setCartItems((prev) => [...prev, event]);
    } catch (error) {
      console.error(error);
    }
  };

  const removeItem = async (eventId) => {
    try {
      await removeFromCart(eventId);
      setCartItems((prev) => prev.filter((item) => item.id !== eventId));
    } catch (error) {
      console.error(error);
    }
  };

  const clearCart = () => setCartItems([]);

  useEffectEvent(() => {
    fetchCart();
  }, []);

  return (
    <CartContext.Provider value={{ cartItems, loading, addItem, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;