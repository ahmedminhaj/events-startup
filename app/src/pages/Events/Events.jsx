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
      <div className={styles.status}>
        Loading events...
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.error}>
        {error}
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
