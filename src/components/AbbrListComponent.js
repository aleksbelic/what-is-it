import React, {useState, useEffect} from 'react';
import {Inter} from '@next/font/google';

const interFont = Inter({subsets: ['latin']});

export default function AbbrListComponent() {
  const [filterValue, setFilterValue] = useState('');
  const [abbrList, setAbbrList] = useState({});

  useEffect(() => {
    fetch('http://localhost:3000/api/v1/list')
      .then(response => response.json())
      .then(json => setAbbrList(json));
  }, []);

  const handleFilterValueChange = e => {
    let newFilterValue = e.target.value.toUpperCase();
    setFilterValue(newFilterValue);
  };

  const getFiltratedAbbrList = () => {
    return Object.fromEntries(
      Object.entries(abbrList).filter(([abbrKey, _]) =>
        abbrKey.includes(filterValue)
      )
    );
  };

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
            <li key={filteredAbbrListItemIndex}>
              <h4>{filteredAbbrListItemKey}</h4>
              {!Array.isArray(abbrList[filteredAbbrListItemKey]) ? (
                <p>{abbrList[filteredAbbrListItemKey]}</p>
              ) : (
                abbrList[filteredAbbrListItemKey].map(
                  (multipleSameKeyAbbrFull, multipleSameKeyAbbrIndex) => (
                    <p key={multipleSameKeyAbbrIndex}>
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
