import {
  createContext,
  useEffect,
  useState,
} from 'react';

import {
  addToCart,
  getCartItems,
  removeFromCart,
} from '../api/cartApi';

export const CartContext = createContext(null);

const CartProvider = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState([]);

  const [loading, setLoading] = useState(false);

  /*
    LOAD CART
  */

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

  /*
    ADD
  */

  const addItem = async (event) => {
      try {
        await addToCart(event.id);

        setCartItems((prev) => [
          ...prev,
          event,
        ]);
      } catch (error) {
        console.error(error);
      }
    };

  /*
    REMOVE
  */

  const removeItem = async (eventId) => {
      try {
        await removeFromCart(
          eventId
        );

        setCartItems((prev) =>
          prev.filter(
            (item) =>
              item.id !== eventId
          )
        );
      } catch (error) {
        console.error(error);
      }
    };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        loading,
        addItem,
        removeItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;