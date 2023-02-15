import React, {useEffect, useState} from 'react';
import {Inter} from '@next/font/google';
import AbbrListComponent from '@/components/AbbrListComponent';
import AbbrImporterComponent from '@/components/AbbrImporterComponent';

const interFont = Inter({subsets: ['latin']});

export default function HomeComponent() {
  const [abbrList, setAbbrList] = useState({});

  useEffect(() => {
    fetch('/api/abbrs')
      .then(abbrListJson => abbrListJson.json())
      .then(abbrListObj => {
        setAbbrList(abbrListObj);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className={interFont.className}>
      <AbbrImporterComponent />
      <br />
      <AbbrListComponent abbrList={abbrList} />
    </div>
  );
}
