import styles from '@/styles/Header.module.css';

export default function HeaderComponent() {
  return (
    <header className={styles.header}>
      <span>
        <b>What is IT - API</b> /&nbsp;
        <small>
          <i>by Aleksanchez</i>
        </small>
      </span>
    </header>
  );
}
