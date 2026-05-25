import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './EventListItem.module.css';
import useCart from '../../hooks/useCart';
import useAuth from '../../hooks/useAuth';

const EventListItem = ({ event }) => {
  const { addItem } = useCart();
  const { isAuthenticated } = useAuth();
  const [added, setAdded] = useState(false);
  const { id, title, date, city, category, price, image, spotsLeft, description, tags } = event;
  const isUrgent = spotsLeft <= 20;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(event);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <Link to={`/events/${id}`} className={styles.item}>
      {/* Image */}
      <div className={styles.imageWrap}>
        <img src={image} alt={title} className={styles.image} loading="lazy" />
        <span className={styles.categoryBadge}>{category}</span>
        {isUrgent && (
          <span className={styles.urgentBadge}>🔥 {spotsLeft} left</span>
        )}
      </div>

      {/* Body */}
      <div className={styles.body}>
        <div className={styles.meta}>
          <span className={styles.metaItem}>
            <span className={styles.metaIcon}>📅</span> {date}
          </span>
          <span className={styles.metaItem}>
            <span className={styles.metaIcon}>📍</span> {city}
          </span>
        </div>

        <h3 className={styles.title}>{title}</h3>

        {description && (
          <p className={styles.description}>{description}</p>
        )}

        {tags?.length > 0 && (
          <div className={styles.tags}>
            {tags.map(tag => (
              <span key={tag} className={styles.tag}>{tag}</span>
            ))}
          </div>
        )}
      </div>

      {/* Action panel */}
      <div className={styles.action}>
        <div>
          <div className={styles.price}>
            {price === 0 ? 'Free' : `$${price}`}
          </div>
          {price > 0 && <div className={styles.priceSub}>per person</div>}
        </div>

        {isAuthenticated ? (
          <button
            className={added ? styles.bookBtnAdded : styles.bookBtn}
            onClick={handleAddToCart}
          >
            {added ? '✓ Added to Cart' : 'Add To Cart →'}
          </button>
        ) : (
          <div className={styles.loginAlertBox}>Login to Book</div>
        )}

        {isUrgent && (
          <span className={styles.spotsLeft}>Only {spotsLeft} spots left!</span>
        )}
      </div>
    </Link>
  );
};

export default EventListItem;