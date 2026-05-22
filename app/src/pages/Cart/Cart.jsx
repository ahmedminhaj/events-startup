import { Link } from 'react-router-dom';
// import { useNavigate } from "react-router-dom";
import styles from './Cart.module.css';
import useCart from '../../hooks/useCart';
import useAuth from '../../hooks/useAuth';

const Cart = () => {
//   const navigate = useNavigate();
  const { cartItems, removeItem } = useCart();
  const { user } = useAuth();

  const total = cartItems.reduce((sum, e) => sum + (e.price || 0), 0);

  /* ── Empty state ── */
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
      {/* ── Header ── */}
      <div className={styles.header}>
        <span className={styles.eyebrow}>🎟️ Your Cart</span>
        <h1 className={styles.title}>
          {cartItems.length} event{cartItems.length > 1 ? 's' : ''} selected
        </h1>
        <p className={styles.subtitle}>
          Review your picks before booking.
        </p>
      </div>

      {/* ── Two-column layout ── */}
      <div className={styles.layout}>

        {/* ── LEFT: item list ── */}
        <div className={styles.list}>
          {cartItems.map((event) => {
            const isFree = !event.price || event.price === 0;
            return (
              <div key={event.id} className={styles.item}>
                {/* Thumbnail */}
                {event.image && (
                  <div className={styles.thumb}>
                    <img src={event.image} alt={event.title} className={styles.thumbImg} />
                    {event.category && (
                      <span className={styles.categoryBadge}>{event.category}</span>
                    )}
                  </div>
                )}

                {/* Info */}
                <div className={styles.info}>
                  <h3 className={styles.itemTitle}>{event.title}</h3>
                  <div className={styles.itemMeta}>
                    {event.date && (
                      <span className={styles.metaItem}>
                        <span className={styles.metaIcon}>📅</span>
                        {event.date}
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
                        <span className={styles.metaIcon}>🏛️</span>
                        {event.venue}
                      </span>
                    )}
                  </div>
                </div>

                {/* Price + remove */}
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

        {/* ── RIGHT: order summary ── */}
        <aside className={styles.sidebar}>
          <div className={styles.summaryCard}>
            <h2 className={styles.summaryTitle}>Order Summary</h2>

            {/* Line items */}
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

            {/* Total */}
            <div className={styles.totalRow}>
              <span className={styles.totalLabel}>Total</span>
              <span className={styles.totalValue}>
                {total === 0 ? 'Free' : `${total} DKK`}
              </span>
            </div>

            {/* CTA */}
            <button
              disabled={!user}
              className={`${styles.proceedBtn} ${!user ? styles.proceedBtnDisabled : ''}`}
            //   onClick={()=> {
            //     navigate('/events');
            //   }}
            >
              {user ? 'Proceed to Booking →' : '🔒 Login to Proceed'}
            </button>

            {/* Login hint */}
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