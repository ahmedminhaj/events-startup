import { useState, useEffect } from 'react';
import { getEvents } from "../../api/eventsApi";
import EventListItem from '../../components/Events/EventListItem';
import EventSearch from '../../components/Events/EventSearch';
// import { EVENTS } from '../../assets/data/events';
import styles from './Events.module.css';

const Events = () => {
  const [query, setQuery] = useState('');
  const [events, setEvents] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        
        setError("");

        const data = await getEvents();

        setEvents(data);
      } catch (err) {
        setError(
          err.message ||
            "Unable to load events"
        );
      } finally {
        setLoading(false);
      }
    };
    
    fetchEvents();
  }, []);
  
  if (loading) {
    return (
      <div className={styles.stateWrap}>
        <div className={styles.spinner}>
          <svg viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="26" cy="26" r="22" strokeWidth="3" className={styles.spinnerTrack} />
            <path d="M26 4a22 22 0 0 1 22 22" strokeWidth="3" strokeLinecap="round" className={styles.spinnerArc} />
          </svg>
        </div>
        <p className={styles.stateTitle}>Loading events</p>
        <p className={styles.stateBody}>Fetching upcoming events...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.stateWrap}>
        <div className={styles.errorIcon}>
          <span>!</span>
        </div>
        <p className={styles.stateTitle}>Something went wrong</p>
        <p className={styles.stateBody}>{error}</p>
        <button className={styles.retryBtn} onClick={() => window.location.reload()}>
          ↻ Try again
        </button>
      </div>
    );
  }
  
  const filtered = events.filter((event) =>
    event.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className={`${styles.page} animateFadeUp`}>

      {/* ── Header ── */}
      <div className={styles.header}>
        <div className={styles.eyebrow}>🎟️ Browse &amp; Book</div>
        <h1 className={styles.title}>Upcoming Events</h1>
        <p className={styles.subtitle}>
          From sold-out concerts to niche workshops — find exactly what you're looking for.
        </p>
      </div>

      {/* ── Search ── */}
      <EventSearch value={query} onChange={setQuery} />

      {/* ── List ── */}
      {filtered.length > 0 ? (
        <div className={styles.list}>
          {filtered.map((event) => (
            <EventListItem key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <div className={styles.empty}>
          <div className={styles.emptyIcon}>🔍</div>
          <h3 className={styles.emptyTitle}>No events found</h3>
          <p className={styles.emptyBody}>Try a different search term.</p>
        </div>
      )}
    </div>
  );
};

export default Events;
