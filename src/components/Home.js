import React, {useEffect, useState} from 'react';
import AbbrList from '@/components/AbbrList';
import AbbrImporter from '@/components/AbbrImporter';
import styles from '@/styles/Home.module.css';

export default function Home() {
  const [abbrList, setAbbrList] = useState({});

  async function getAbbrsWithMeanings() {
    try {
      const fetchResponse = await fetch('/api/abbrs');
      const fetchedData = await fetchResponse.json();
      if (fetchResponse.ok) {
        setAbbrList(fetchedData);
      } else {
        throw new Error(fetchedData.errMsg);
      }
    } catch (errObj) {
      alert(`❌ ${errObj.message}`);
    }
  }

  useEffect(() => {
    getAbbrsWithMeanings();
  }, []);

  return (
    <>
      <AbbrImporter getAbbrsWithMeanings={getAbbrsWithMeanings} />
      {Object.keys(abbrList).length !== 0 ? (
        <AbbrList abbrList={abbrList} />
      ) : (
        <div className={styles.loaderWrapper}>
          <span className={styles.spinner}></span>
          <span>Loading...</span>
        </div>
      )}
    </>
  );
}
