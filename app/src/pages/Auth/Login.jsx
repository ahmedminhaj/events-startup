import AuthForm from '../../components/Auth/AuthForm';
import styles from './Login.module.css';

const Login = ({ onAuth, onSwitchToRegister }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h2 className={styles.title}>Welcome back</h2>
          <p className={styles.subtitle}>Log in to your Ticker account</p>
        </div>

        <AuthForm mode="login" onAuth={onAuth} />

        <p className={styles.switchText}>
          Don't have an account?{' '}
          <button className={styles.switchLink} onClick={onSwitchToRegister}>
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
