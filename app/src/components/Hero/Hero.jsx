import { Link } from 'react-router-dom';
import styles from './Hero.module.css';

const CHIPS = ['All', 'Music', 'Tech', 'Sports', 'Art', 'Food'];

const Hero = () => {
  return (
    <section className={styles.hero}>
      {/* ── Left Column ── */}
      <div className="animateFadeUp">
        <span className={`badge badgeBrand ${styles.heroEyebrow}`}>
          🎉 Event discovery made simple
        </span>

        <h1 className={styles.heroTitle}>
          Find events, book tickets &amp; enjoy every moment with{' '}
          <span className="textGradient">Ticker.</span>
        </h1>

        <p className={styles.heroCopy}>
          Ticker is a modern event ticketing app for discovering concerts, tech
          conferences, workshops, meetups, and local experiences. Browse events,
          save favorites, and book tickets in a clean, fast, and effortless way.
        </p>

        <div className={styles.heroActions}>
          <Link to="/events" className="btn btnPrimary btnLg">
            Explore Events
          </Link>
          <Link to="/about" className="btn btnSecondary btnLg">
            Learn More
          </Link>
        </div>
      </div>

      {/* ── Right Column — Phone Card ── */}
      <div className={`${styles.heroPhoneWrap} animateFadeUp delay3 `}>
        <div className={`${styles.phoneCard} animateFloat`}>
          {/* Live badge */}
          <div className={styles.phoneCardBadge}>
            <span className={styles.phoneCardBadgeDot} />
            Live tickets available
          </div>

          <div className={styles.phoneScreen}>
            <div className={styles.phoneScreenHeader}>
              <span>Ticker</span>
              <div className={styles.phoneScreenDots}>
                {[0, 1, 2].map(i => (
                  <span
                    key={i}
                    className={`${styles.phoneScreenDot}${i === 0 ? ` ${styles["phoneScreenDot--active"]}` : ''}`}
                  />
                ))}
              </div>
            </div>

            <div className={styles.phoneScreenSearch}>
              <span className={styles.phoneScreenSearchIcon}>🔎</span>
              Search events near you…
            </div>

            <div className={styles.phoneScreenChips}>
              {CHIPS.map(chip => (
                <span
                  key={chip}
                  className={`${styles.phoneScreenChip}${chip === 'All' ? ` ${styles["phoneScreenChip--active"]}` : ''}`}
                >
                  {chip}
                </span>
              ))}
            </div>

            <div className={styles.phoneFeatureCard}>
              <h3>Your next experience is one tap away.</h3>
              <p>
                Personalized recommendations, smooth checkout, and instant
                digital tickets for every occasion.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;