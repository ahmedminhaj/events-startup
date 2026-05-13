import AuthForm from '../../components/Auth/AuthForm';
import styles from './Register.module.css';

const Register = ({ onAuth, onSwitchToLogin }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h2 className={styles.title}>Create your account</h2>
          <p className={styles.subtitle}>Join Ticker and start booking events</p>
        </div>

        <AuthForm mode="register" onAuth={onAuth} />

        <p className={styles.switchText}>
          Already have an account?{' '}
          <button className={styles.switchLink} onClick={onSwitchToLogin}>
            Log in
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;
