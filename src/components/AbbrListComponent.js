import React, {useState, useEffect} from 'react';
import {Inter} from '@next/font/google';
import abbrListJson from '@/data/abbr-list';

const interFont = Inter({subsets: ['latin']});

export default function AbbrListComponent() {
  const [filterValue, setFilterValue] = useState('');
  const [abbrList, setAbbrList] = useState(abbrListJson);

  function getFiltratedAbbrList() {
    return Object.fromEntries(
      Object.entries(abbrList).filter(([abbrKey, abbrValue]) =>
        abbrKey.includes(filterValue)
      )
    );
  }

  return (
    <div className={interFont.className}>
      <input
        type="text"
        value={filterValue}
        onChange={e => setFilterValue(e.target.value.toUpperCase())}
        data-test="abbr-filter"
      />
      <ul>
        {Object.keys(getFiltratedAbbrList()).map(
          (filteredAbbrListItemKey, filteredAbbrListItemIndex) => (
            <li key={filteredAbbrListItemKey}>
              <h4>{filteredAbbrListItemKey}</h4>
              {!Array.isArray(abbrList[filteredAbbrListItemKey]) ? (
                <p>{abbrList[filteredAbbrListItemKey]}</p>
              ) : (
                abbrList[filteredAbbrListItemKey].map(
                  (multipleSameKeyAbbrFull, multipleSameKeyAbbrIndex) => (
                    <p
                      key={
                        filteredAbbrListItemKey + '_' + multipleSameKeyAbbrFull
                      }
                    >
                      {multipleSameKeyAbbrFull}
                    </p>
                  )
                )
              )}
            </li>
          )
        )}
      </ul>
    </div>
  );
}
