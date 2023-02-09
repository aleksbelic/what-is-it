import React, {useState, useEffect} from 'react';
import {Inter} from '@next/font/google';

const interFont = Inter({subsets: ['latin']});

export default function AbbrListComponent() {
  const [filterValue, setFilterValue] = useState('');
  const [abbrList, setAbbrList] = useState({});

  useEffect(() => {
    fetch('/api/v1/list')
      .then(response => response.json())
      .then(json => setAbbrList(json));

    /* fetch('/api/v1/sort')
      .then(response => response.text())
      .then(text => console.log(text));*/
  }, []);

  function handleFilterValueChange(e) {
    let newFilterValue = e.target.value.toUpperCase();
    setFilterValue(newFilterValue);
  }

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
        onChange={handleFilterValueChange}
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
