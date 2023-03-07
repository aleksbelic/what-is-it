import Image from 'next/image';
import styles from '@/styles/Header.module.css';

export default function HeaderComponent() {
  return (
    <header className={styles.header}>
      <Image
        src="/favicon-invert.png"
        alt="API Logo"
        className={styles.logo}
        width={25}
        height={25}
        title="What is IT - API"
        priority
      />
      <span>
        <b>What is IT - API</b> /&nbsp;
        <small>
          <i>by Aleksanchez</i>
        </small>
      </span>
    </header>
  );
}
