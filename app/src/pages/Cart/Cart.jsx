import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Cart.module.css';
import useCart from '../../hooks/useCart';
import useAuth from '../../hooks/useAuth';
import { confirmBooking } from '../../api/bookingApi';

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, removeItem, clearCart } = useCart();
  const { user } = useAuth();

  const [booking, setBooking] = useState(false);
  const [booked, setBooked]   = useState(false);
  const [error, setError]     = useState('');

  const total = cartItems.reduce((sum, e) => sum + (e.price || 0), 0);

  const handleProceed = async () => {
    if (!user || booking) return;
    try {
      setBooking(true);
      setError('');
      await confirmBooking();
      clearCart();
      setBooked(true);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setBooking(false);
    }
  };

  /* Success screen */
  if (booked) {
    return (
      <div className={styles.page}>
        <div className={styles.successState}>
          <div className={styles.successIcon}>🎉</div>
          <h2 className={styles.successTitle}>You're all booked!</h2>
          <p className={styles.successBody}>
            Your events have been confirmed. Check your bookings any time.
          </p>
          <div className={styles.successActions}>
            <button
              className={`btn btnPrimary ${styles.browseBtn}`}
              onClick={() => navigate('/bookings')}
            >
              View my bookings →
            </button>
            <Link to="/events" className={styles.secondaryLink}>
              Browse more events
            </Link>
          </div>
        </div>
      </div>
    );
  }

  /* Empty state */
  if (cartItems.length === 0) {
    return (
      <div className={styles.page}>
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>🎟️</div>
          <h2 className={styles.emptyTitle}>Your cart is empty</h2>
          <p className={styles.emptyBody}>
            Browse upcoming events in Denmark and add them here.
          </p>
          <Link to="/events" className={`btn btnPrimary ${styles.browseBtn}`}>
            Browse events →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <span className={styles.eyebrow}>🎟️ Your Cart</span>
        <h1 className={styles.title}>
          {cartItems.length} event{cartItems.length > 1 ? 's' : ''} selected
        </h1>
        <p className={styles.subtitle}>Review your picks before booking.</p>
      </div>

      <div className={styles.layout}>
        {/* LEFT: item list */}
        <div className={styles.list}>
          {cartItems.map((event) => {
            const isFree = !event.price || event.price === 0;
            return (
              <div key={event.id} className={styles.item}>
                {event.image && (
                  <div className={styles.thumb}>
                    <img src={event.image} alt={event.title} className={styles.thumbImg} />
                    {event.category && (
                      <span className={styles.categoryBadge}>{event.category}</span>
                    )}
                  </div>
                )}
                <div className={styles.info}>
                  <h3 className={styles.itemTitle}>{event.title}</h3>
                  <div className={styles.itemMeta}>
                    {event.date && (
                      <span className={styles.metaItem}>
                        <span className={styles.metaIcon}>📅</span>{event.date}
                      </span>
                    )}
                    {(event.city || event.location) && (
                      <span className={styles.metaItem}>
                        <span className={styles.metaIcon}>📍</span>
                        {event.city || event.location}
                      </span>
                    )}
                    {event.venue && (
                      <span className={styles.metaItem}>
                        <span className={styles.metaIcon}>🏛️</span>{event.venue}
                      </span>
                    )}
                  </div>
                </div>
                <div className={styles.itemRight}>
                  <span className={styles.itemPrice}>
                    {isFree ? 'Free' : `${event.price} DKK`}
                  </span>
                  <button
                    className={styles.removeBtn}
                    onClick={() => removeItem(event.id)}
                    aria-label={`Remove ${event.title}`}
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* RIGHT: order summary */}
        <aside className={styles.sidebar}>
          <div className={styles.summaryCard}>
            <h2 className={styles.summaryTitle}>Order Summary</h2>

            <ul className={styles.summaryLines}>
              {cartItems.map((event) => (
                <li key={event.id} className={styles.summaryLine}>
                  <span className={styles.summaryLineName}>{event.title}</span>
                  <span className={styles.summaryLinePrice}>
                    {!event.price || event.price === 0 ? 'Free' : `${event.price} DKK`}
                  </span>
                </li>
              ))}
            </ul>

            <div className={styles.summaryDivider} />

            <div className={styles.totalRow}>
              <span className={styles.totalLabel}>Total</span>
              <span className={styles.totalValue}>
                {total === 0 ? 'Free' : `${total} DKK`}
              </span>
            </div>

            {error && <p className={styles.errorMsg}>⚠️ {error}</p>}

            <button
              disabled={!user || booking}
              className={`${styles.proceedBtn} ${(!user || booking) ? styles.proceedBtnDisabled : ''}`}
              onClick={handleProceed}
            >
              {booking ? (
                <span className={styles.btnSpinner} />
              ) : user ? (
                'Confirm Booking →'
              ) : (
                '🔒 Login to Proceed'
              )}
            </button>

            {!user && (
              <p className={styles.loginHint}>
                You need to be logged in to complete your booking.
              </p>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Cart;