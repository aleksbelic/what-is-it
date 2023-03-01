import React, {useEffect, useState} from 'react';
import {Inter} from '@next/font/google';
import AbbrListComponent from '@/components/AbbrListComponent';
import AbbrImporterComponent from '@/components/AbbrImporterComponent';

const interFont = Inter({subsets: ['latin']});

export default function HomeComponent() {
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
    <div id="home" className={interFont.className}>
      <AbbrImporterComponent getAbbrsWithMeanings={getAbbrsWithMeanings} />
      {Object.keys(abbrList).length !== 0 ? (
        <>
          <br />
          <AbbrListComponent abbrList={abbrList} />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
