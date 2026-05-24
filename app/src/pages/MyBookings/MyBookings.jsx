import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getMyBookings } from '../../api/bookingApi';
import useAuth from '../../hooks/useAuth';
import styles from './MyBookings.module.css';

const MyBookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState('');

  useEffect(() => {
    if (!user) return;
    const fetch = async () => {
      try {
        setLoading(true);
        const data = await getMyBookings();
        setBookings(data);
      } catch (err) {
        setError(err.message || 'Failed to load bookings');
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [user]);

  /* Not logged in */
  if (!user) {
    return (
      <div className={styles.page}>
        <div className={styles.centreState}>
          <div className={styles.centreIcon}>🔒</div>
          <h2 className={styles.centreTitle}>Login to see your bookings</h2>
          <p className={styles.centreBody}>Your confirmed events will appear here.</p>
        </div>
      </div>
    );
  }

  /* Loading */
  if (loading) {
    return (
      <div className={styles.page}>
        <div className={styles.centreState}>
          <div className={styles.spinner} />
          <p className={styles.centreBody}>Loading your bookings…</p>
        </div>
      </div>
    );
  }

  /* Error */
  if (error) {
    return (
      <div className={styles.page}>
        <div className={styles.centreState}>
          <div className={styles.centreIcon}>⚠️</div>
          <h2 className={styles.centreTitle}>Something went wrong</h2>
          <p className={styles.centreBody}>{error}</p>
        </div>
      </div>
    );
  }

  /* Empty */
  if (bookings.length === 0) {
    return (
      <div className={styles.page}>
        <div className={styles.centreState}>
          <div className={styles.centreIcon}>🎟️</div>
          <h2 className={styles.centreTitle}>No bookings yet</h2>
          <p className={styles.centreBody}>
            Browse events and book your first one today.
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
      {/* Header */}
      <div className={styles.header}>
        <span className={styles.eyebrow}>✅ My Bookings</span>
        <h1 className={styles.title}>
          {bookings.length} confirmed event{bookings.length > 1 ? 's' : ''}
        </h1>
        <p className={styles.subtitle}>
          Hey {user.name?.split(' ')[0]}, here are all your confirmed events.
        </p>
      </div>

      {/* Grid */}
      <div className={styles.grid}>
        {bookings.map((event) => {
          const isFree = !event.price || event.price === 0;
          const bookedDate = event.booked_at
            ? new Date(event.booked_at).toLocaleDateString('da-DK', {
                day: 'numeric', month: 'short', year: 'numeric',
              })
            : null;

          return (
            <div key={event.booking_id} className={styles.card}>
              {/* Image */}
              <div className={styles.imageWrap}>
                <img src={event.image} alt={event.title} className={styles.image} />
                <div className={styles.imageOverlay} />
                {event.category && (
                  <span className={styles.categoryBadge}>{event.category}</span>
                )}
                <span className={styles.confirmedBadge}>✓ Confirmed</span>
              </div>

              {/* Body */}
              <div className={styles.body}>
                <h3 className={styles.cardTitle}>{event.title}</h3>

                <div className={styles.meta}>
                  {event.date && (
                    <span className={styles.metaItem}>
                      <span className={styles.metaIcon}>📅</span>{event.date}
                    </span>
                  )}
                  {event.city && (
                    <span className={styles.metaItem}>
                      <span className={styles.metaIcon}>📍</span>{event.city}
                    </span>
                  )}
                  {event.venue && (
                    <span className={styles.metaItem}>
                      <span className={styles.metaIcon}>🏛️</span>{event.venue}
                    </span>
                  )}
                </div>

                <div className={styles.footer}>
                  <span className={styles.price}>
                    {isFree ? 'Free' : `${event.price} DKK`}
                  </span>
                  {bookedDate && (
                    <span className={styles.bookedAt}>Booked {bookedDate}</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyBookings;