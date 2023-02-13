import React, {useState} from 'react';
import {Inter} from '@next/font/google';
import AbbrListComponent from '@/components/AbbrListComponent';
import AbbrImporterComponent from '@/components/AbbrImporterComponent';
import abbrListJson from '@/data/abbr-list';

const interFont = Inter({subsets: ['latin']});

export default function HomeComponent() {
  const [abbrList, setAbbrList] = useState({});

  return (
    <div className={interFont.className}>
      <AbbrImporterComponent />
      <br />
      <AbbrListComponent abbrList={abbrListJson} />
    </div>
  );
}
