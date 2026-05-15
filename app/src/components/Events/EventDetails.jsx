import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getEventById } from "../../api/eventsApi";
import styles from "./EventDetails.module.css";

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await getEventById(id);
        setEvent(data);
      } catch (err) {
        setError(err.message || "Unable to load event");
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  if (loading) {
    return (
      <div className={styles.statusWrap}>
        <div className={styles.spinner} />
        <p className={styles.statusText}>Loading event…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.statusWrap}>
        <div className={styles.errorIcon}>⚠️</div>
        <p className={styles.errorText}>{error}</p>
        <button className={styles.backBtn} onClick={() => navigate(-1)}>
          ← Go back
        </button>
      </div>
    );
  }

  if (!event) {
    return (
      <div className={styles.statusWrap}>
        <div className={styles.errorIcon}>🔍</div>
        <p className={styles.errorText}>Event not found</p>
        <button className={styles.backBtn} onClick={() => navigate(-1)}>
          ← Go back
        </button>
      </div>
    );
  }

  const isUrgent = event.spotsLeft != null && event.spotsLeft <= 20;
  const isFree = event.price === 0;

  return (
    <div className={`${styles.page} animateFadeUp`}>

      {/* ── Back ── */}
      <button className={styles.backBtn} onClick={() => navigate(-1)}>
        ← Back to events
      </button>

      {/* ── Hero image ── */}
      <div className={styles.imageWrap}>
        <img src={event.image} alt={event.title} className={styles.image} />
        <div className={styles.imageOverlay} />

        <span className={styles.categoryBadge}>{event.category}</span>

        {isUrgent && (
          <span className={styles.urgentBadge}>🔥 {event.spotsLeft} spots left</span>
        )}
      </div>

      {/* ── Two-column layout ── */}
      <div className={styles.layout}>

        {/* ── LEFT — main content ── */}
        <div className={styles.main}>
          <h1 className={styles.title}>{event.title}</h1>

          {/* Meta row */}
          <div className={styles.meta}>
            {event.date && (
              <span className={styles.metaItem}>
                <span className={styles.metaIcon}>📅</span>
                {event.date}
              </span>
            )}
            {event.city && (
              <span className={styles.metaItem}>
                <span className={styles.metaIcon}>📍</span>
                {event.city}
              </span>
            )}
            {event.venue && (
              <span className={styles.metaItem}>
                <span className={styles.metaIcon}>🏛️</span>
                {event.venue}
              </span>
            )}
          </div>

          {/* Tags */}
          {event.tags?.length > 0 && (
            <div className={styles.tags}>
              {event.tags.map((tag) => (
                <span key={tag} className={styles.tag}>{tag}</span>
              ))}
            </div>
          )}

          {/* Divider */}
          <div className={styles.divider} />

          {/* Description */}
          <h2 className={styles.sectionHeading}>About this event</h2>
          <p className={styles.description}>{event.description}</p>
        </div>

        {/* ── RIGHT — booking card ── */}
        <aside className={styles.sidebar}>
          <div className={styles.bookingCard}>
            <div className={styles.priceRow}>
              <span className={styles.price}>
                {isFree ? "Free" : `${event.price} DKK`}
              </span>
              {!isFree && (
                <span className={styles.priceSub}>per person</span>
              )}
            </div>

            {isUrgent && (
              <p className={styles.spotsLeft}>
                ⚡ Only {event.spotsLeft} spots remaining!
              </p>
            )}

            <button className={styles.bookBtn}>
              {isFree ? "Reserve a spot →" : "Book Now →"}
            </button>

            {/* Event details summary */}
            <ul className={styles.detailList}>
              {event.date && (
                <li className={styles.detailItem}>
                  <span className={styles.detailIcon}>📅</span>
                  <div>
                    <span className={styles.detailLabel}>Date</span>
                    <span className={styles.detailValue}>{event.date}</span>
                  </div>
                </li>
              )}
              {event.city && (
                <li className={styles.detailItem}>
                  <span className={styles.detailIcon}>📍</span>
                  <div>
                    <span className={styles.detailLabel}>City</span>
                    <span className={styles.detailValue}>{event.city}</span>
                  </div>
                </li>
              )}
              {event.venue && (
                <li className={styles.detailItem}>
                  <span className={styles.detailIcon}>🏛️</span>
                  <div>
                    <span className={styles.detailLabel}>Venue</span>
                    <span className={styles.detailValue}>{event.venue}</span>
                  </div>
                </li>
              )}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default EventDetails;