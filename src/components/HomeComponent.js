import React, {useEffect, useState} from 'react';
import {Inter} from '@next/font/google';
import AbbrListComponent from '@/components/AbbrListComponent';
import AbbrImporterComponent from '@/components/AbbrImporterComponent';

const interFont = Inter({subsets: ['latin']});

export default function HomeComponent() {
  const [abbrList, setAbbrList] = useState({});

  useEffect(() => {
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
        alert(errObj.message);
      }
    }
    getAbbrsWithMeanings();
  }, []);

  return (
    <div className={interFont.className}>
      <AbbrImporterComponent />
      {Object.keys(abbrList).length !== 0 ? (
        <>
          <br />
          <AbbrListComponent abbrList={abbrList} />
        </>
      ) : (
        <p>No abbreviations found.</p>
      )}
    </div>
  );
}
