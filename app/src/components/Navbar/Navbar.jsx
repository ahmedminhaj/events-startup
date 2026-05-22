import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../../assets/icons/ticker-logo.svg';
import AuthModal from '../../components/Auth/AuthModal';
import styles from './Navbar.module.css';
import  useAuth  from '../../hooks/useAuth';

const NAV_LINKS = [
  { label: 'Home',    to: '/' },
  { label: 'Events',  to: '/events' },
  { label: 'About',   to: '/about' },
  { label: 'Contact', to: '/contact' },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [authModal, setAuthModal] = useState(null); 
  const { user, logout } = useAuth();

  const handleLogout = () => logout();
  const openAuth = (mode) => { setOpen(false); setAuthModal(mode); };

  return (
    <>
      <nav className={styles.navbar}>
        <Link to="/" className={styles.navbarBrand}>
          <img src={logo} alt="Ticker" className={styles.navbarLogo} />
        </Link>

        <ul className={styles.navbarLinks}>
          {NAV_LINKS.map(({ label, to }) => (
            <li key={to}>
              <NavLink
                to={to}
                end
                className={({ isActive }) =>
                  `${styles.navbarLink}${isActive ? ` ${styles['navbarLink--active']}` : ''}`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className={styles.navbarActions}>
          {user ? (
            <div className={styles.userMenu}>
              <div className={styles.avatar} title={user}>{user.name[0].toUpperCase()}</div>
              <button className={styles.logoutBtn} onClick={handleLogout}>Log out</button>
            </div>
          ) : (
            <>
              <button className={styles.authLink} onClick={() => setAuthModal('login')}>Log in</button>
              <button className={`btn btnPrimary ${styles.authBtn}`} onClick={() => setAuthModal('register')}>
                Sign up
              </button>
            </>
          )}
        </div>

        <button
          className={styles.navbarToggle}
          aria-label="Toggle menu"
          onClick={() => setOpen((o) => !o)}
        >
          <span className={styles.navbarToggleBar} />
          <span className={styles.navbarToggleBar} />
          <span className={styles.navbarToggleBar} />
        </button>
      </nav>

      {open && (
        <div className={styles.navbarDrawer}>
          <div className={styles.navbarDrawerLogo}>
            <img src={logo} alt="Ticker" className={styles.navbarLogo} />
          </div>
          {NAV_LINKS.map(({ label, to }) => (
            <Link
              key={to}
              to={to}
              className={styles.navbarDrawerLink}
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
          <div className={styles.drawerAuthRow}>
            {user ? (
              <>
                <div className={styles.avatar}>{user.name[0].toUpperCase()}</div>
                <span className={styles.drawerUsername}>{user.name}</span>
                <button className={styles.logoutBtn} onClick={handleLogout}>Log out</button>
              </>
            ) : (
              <>
                <button className={styles.authLink} onClick={() => openAuth('login')}>Log in</button>
                <button className="btn btnPrimary" onClick={() => openAuth('register')}>Sign up</button>
              </>
            )}
          </div>
        </div>
      )}

      {authModal && (
        <AuthModal
          initialMode={authModal}
          onClose={() => setAuthModal(null)}
          // onAuth={handleAuth}
        />
      )}
    </>
  );
};

export default Navbar;
