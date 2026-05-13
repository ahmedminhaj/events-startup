import styles from './EventSearch.module.css';

const EventSearch = ({ value, onChange }) => {
  return (
    <div className={styles.wrapper}>
      <span className={styles.icon} aria-hidden="true">🔍</span>
      <input
        type="text"
        className={styles.input}
        placeholder="Search events by name…"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Search events"
      />
      {value && (
        <button
          className={styles.clear}
          onClick={() => onChange('')}
          aria-label="Clear search"
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default EventSearch;
