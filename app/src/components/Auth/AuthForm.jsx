import { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import styles from './AuthForm.module.css';

const AuthForm = ({ mode, onAuth }) => {
  const { login, register } = useAuth();

  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const isLogin = mode === 'login';

  const set = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
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

    try {
      setLoading(true);
      if (isLogin) {
        await login(form.email, form.password);
      } else {
        await register(form.name, form.email, form.password);
      }
      if (onAuth) onAuth();
    } catch (err) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form} noValidate>
      {error && <p className={styles.error}>{error}</p>}

      {!isLogin && (
        <div className={styles.field}>
          <label className={styles.label} htmlFor="auth-name">
            Full name
          </label>
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
        <label className={styles.label} htmlFor="auth-email">
          Email address
        </label>
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
        <label className={styles.label} htmlFor="auth-password">
          Password
        </label>
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

      <button
        type="submit"
        className={`btn btnPrimary ${styles.submit}`}
        disabled={loading}
      >
        {loading ? 'Please wait...' : isLogin ? 'Log in' : 'Create account'}
      </button>
    </form>
  );
};

export default AuthForm;