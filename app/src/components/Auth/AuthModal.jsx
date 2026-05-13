import { useState } from 'react';
import Login from '../../pages/Auth/Login';
import Register from '../../pages/Auth/Register';
import styles from './AuthModal.module.css';

const AuthModal = ({ initialMode = 'login', onClose, onAuth }) => {
  const [mode, setMode] = useState(initialMode);

  const handleAuth = (displayName) => {
    onAuth(displayName);
    onClose();
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={mode === 'login' ? 'Log in' : 'Sign up'}
      >
        <button
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Close"
        >
          ✕
        </button>

        {mode === 'login' ? (
          <Login
            onAuth={handleAuth}
            onSwitchToRegister={() => setMode('register')}
          />
        ) : (
          <Register
            onAuth={handleAuth}
            onSwitchToLogin={() => setMode('login')}
          />
        )}
      </div>
    </div>
  );
};

export default AuthModal;
