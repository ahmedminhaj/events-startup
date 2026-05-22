const API_BASE_URL =
  'http://localhost:3001/api/cart';

const getHeaders = () => {
  const token =
    localStorage.getItem(
      'token'
    );

  return {
    'Content-Type':
      'application/json',

    Authorization: `Bearer ${token}`,
  };
};

export const getCartItems =
  async () => {
    const response =
      await fetch(
        API_BASE_URL,
        {
          headers:
            getHeaders(),
        }
      );

    if (!response.ok) {
      throw new Error(
        'Failed to fetch cart'
      );
    }

    return response.json();
  };

export const addToCart =
  async (eventId) => {
    const response =
      await fetch(
        API_BASE_URL,
        {
          method: 'POST',

          headers:
            getHeaders(),

          body: JSON.stringify({
            eventId,
          }),
        }
      );

    if (!response.ok) {
      throw new Error(
        'Failed to add item'
      );
    }

    return response.json();
  };

export const removeFromCart =
  async (eventId) => {
    const response =
      await fetch(
        `${API_BASE_URL}/${eventId}`,
        {
          method: 'DELETE',

          headers:
            getHeaders(),
        }
      );

    if (!response.ok) {
      throw new Error(
        'Failed to remove item'
      );
    }

    return response.json();
  };