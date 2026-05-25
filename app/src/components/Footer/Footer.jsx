import { Link } from 'react-router-dom';
import logo from '../../assets/icons/ticker-logo.svg';
import styles from './Footer.module.css';

const LINKS = {
  Company:  ['Home', 'About Us', 'Contact', 'Events'],
};

const SOCIALS = [
  { label: 'Twitter / X', icon: '𝕏', href: '#' },
  { label: 'Instagram',   icon: '📷', href: '#' },
  { label: 'LinkedIn',    icon: 'in', href: '#' },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerTop}>
        {/* Brand */}
        <div>
          <Link to="/" className={styles.footerBrand}>
            <img src={logo} alt="Ticker" className={styles.footerLogoImg} />
          </Link>
          <p className={styles.footerTagline}>
            Discover events, book tickets, and create unforgettable memories — all in one place.
          </p>
          <div className={styles.footerSocials}>
            {SOCIALS.map(({ label, icon, href }) => (
              <a key={label} href={href} className={styles.footerSocial} aria-label={label}>
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* Link columns */}
        {Object.entries(LINKS).map(([col, items]) => (
          <div key={col}>
            <ul className={styles.footerColLinks}>
              {items.map(item => (
                <li key={item}>
                  <a href="#" className={styles.footerColLink}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className={styles.footerBottom}>
        <span>© {year} Ticker, Inc. All rights reserved by Hack Your Future.</span>
      </div>
    </footer>
  );
}

export default Footer;