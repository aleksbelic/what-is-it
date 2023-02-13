import Head from 'next/head';
import styles from '@/styles/Home.module.css';
import HomeComponent from '@/components/HomeComponent';

export default function Home() {
  return (
    <>
      <Head>
        <title>What is IT - API</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <HomeComponent />
      </main>
    </>
  );
}
