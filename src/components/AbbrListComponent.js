import React, {useState} from 'react';

export default function AbbrListComponent({abbrList}) {
  const [filterValue, setFilterValue] = useState('');

  function getFiltratedAbbrList() {
    return Object.fromEntries(
      Object.entries(abbrList).filter(([abbrKey, abbrValue]) =>
        abbrKey.includes(filterValue)
      )
    );
  }

  return (
    <>
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
              {abbrList[filteredAbbrListItemKey].map(
                (multipleSameKeyAbbrFull, multipleSameKeyAbbrIndex) => (
                  <p
                    key={
                      filteredAbbrListItemKey + '_' + multipleSameKeyAbbrFull
                    }
                  >
                    {multipleSameKeyAbbrFull}
                  </p>
                )
              )}
            </li>
          )
        )}
      </ul>
    </>
  );
}
