import Hero from '../../components/Hero/Hero';

import styles from './Home.module.css';

const Home = () => {
  return (
    <>
      <Hero />

      {/* CTA Banner */}
      <section className={styles.homeCta} id="cta">
        <div className={styles.homeCtaInner}>
          <h2 className={styles.homeCtaTitle}>
            Ready to find your next <span className={styles.textGradient}>unforgettable</span> experience?
          </h2>
          <p className={styles.homeCtaSub}>
            Join 85,000+ people already using Ticker to discover and book events they love.
          </p>
          <div className={styles.homeCtaActions}>
            <a href="/events" className="btn btnPrimary btnLg">Get Started Free</a>
            <a href="/about"  className="btn btnSecondary btnLg">Learn More</a>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;