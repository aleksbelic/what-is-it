import Head from 'next/head';
import {Inter} from 'next/font/google';
import styles from '@/styles/Home.module.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const inter = Inter({subsets: ['latin']});

export default function Home() {
  return (
    <>
      <Head>
        <title>What is IT - API</title>
        <meta
          name="description"
          content="User-friendly API for deciphering abbreviated IT terms."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <div className={styles.wrapper}>
        <Header />
        <main className={styles.main}></main>
        <Footer />
      </div>
    </>
  );
}
