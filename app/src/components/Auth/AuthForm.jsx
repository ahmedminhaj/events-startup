import { useState } from 'react';
import styles from './AuthForm.module.css';

const AuthForm = ({ mode, onAuth }) => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const isLogin = mode === 'login';

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!isLogin && !form.name.trim()) {
      setError('Please enter your name.');
      return;
    }
    if (!form.email.trim()) {
      setError('Please enter your email.');
      return;
    }
    if (!form.password) {
      setError('Please enter your password.');
      return;
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    const displayName = isLogin ? form.email.split('@')[0] : form.name.trim();
    onAuth(displayName);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form} noValidate>
      {error && <p className={styles.error}>{error}</p>}

      {!isLogin && (
        <div className={styles.field}>
          <label className={styles.label} htmlFor="auth-name">Full name</label>
          <input
            id="auth-name"
            className={styles.input}
            type="text"
            placeholder="Jane Smith"
            value={form.name}
            onChange={set('name')}
            autoComplete="name"
          />
        </div>
      )}

      <div className={styles.field}>
        <label className={styles.label} htmlFor="auth-email">Email address</label>
        <input
          id="auth-email"
          className={styles.input}
          type="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={set('email')}
          autoComplete="email"
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="auth-password">Password</label>
        <input
          id="auth-password"
          className={styles.input}
          type="password"
          placeholder="Min. 6 characters"
          value={form.password}
          onChange={set('password')}
          autoComplete={isLogin ? 'current-password' : 'new-password'}
        />
      </div>

      <button type="submit" className={`btn btnPrimary ${styles.submit}`}>
        {isLogin ? 'Log in' : 'Create account'}
      </button>
    </form>
  );
};

export default AuthForm;
