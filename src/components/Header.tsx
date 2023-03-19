import Image from 'next/image';
import styles from '@/styles/Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <b>What is</b>
      <Image
        src="/favicon-invert.png"
        alt="API Logo"
        className={styles.logo}
        width={25}
        height={25}
        title="What is IT - API"
        priority
      />
      <b>API</b> &nbsp;&#47;&nbsp;
      <small>
        <i>by Aleksanchez</i>
      </small>
    </header>
  );
}
