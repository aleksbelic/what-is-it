import styles from '@/styles/Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <small>
        Copyright &copy; Aleksandar Belic {new Date(Date.now()).getFullYear()}
      </small>
    </footer>
  );
}
