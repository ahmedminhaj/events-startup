import styles from './Cart.module.css';

import useCart from '../../hooks/useCart';

import useAuth from '../../hooks/useAuth';

const Cart = () => {
  const { cartItems, removeItem,} = useCart();

  const { user } = useAuth();

  return (
    <section className={styles.cartPage}>
      <div  className={styles.container} >
        <h1 className={styles.title} >
          Your Cart
        </h1>

        {cartItems.length === 0 ? (
          <p className={ styles.empty } >
            No events selected.
          </p>
        ) : (
          <>
            <div className={ styles.list } >
              {cartItems.map((event) => (
                  <div key={event.id} className={ styles.item } >
                    <div>
                      <h3> { event.title } </h3>
                      <p> { event.date } </p>
                    </div>

                    <button onClick={() => removeItem( event.id )}>
                      Remove
                    </button>
                  </div>
                )
              )}
            </div>

            <button disabled={!user} className={`btn btnPrimary ${styles.proceedBtn}`} >
              {user
                ? 'Proceed Booking'
                : 'Login to Proceed'}
            </button>

            {!user && (
              <p className={ styles.loginHint }>
                Please login to continue booking.
              </p>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Cart;