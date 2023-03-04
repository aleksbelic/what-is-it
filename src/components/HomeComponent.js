import React, {useEffect, useState} from 'react';
import AbbrListComponent from '@/components/AbbrListComponent';
import AbbrImporterComponent from '@/components/AbbrImporterComponent';

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
    <>
      <AbbrImporterComponent getAbbrsWithMeanings={getAbbrsWithMeanings} />
      {Object.keys(abbrList).length !== 0 ? (
        <AbbrListComponent abbrList={abbrList} />
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}
