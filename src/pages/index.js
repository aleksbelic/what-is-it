import Head from 'next/head';
import styles from '@/styles/Home.module.css';
import HomeComponent from '@/components/HomeComponent';
import HeaderComponent from '@/components/HeaderComponent';
import FooterComponent from '@/components/FooterComponent';

export default function Start() {
  return (
    <>
      <Head>
        <title>What is IT - API</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.wrapper}>
        <HeaderComponent />
        <main className={styles.main}>
          <HomeComponent />
        </main>
        <FooterComponent />
      </div>
    </>
  );
}
