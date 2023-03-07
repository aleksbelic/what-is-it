import React, {useState} from 'react';
import styles from '@/styles/Home.module.css';

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
    <div className={styles.abbrListWrapper}>
      <input
        className={styles.abbrListFilter}
        type="text"
        value={filterValue}
        placeholder="Search..."
        onChange={e => setFilterValue(e.target.value.toUpperCase())}
        data-testid="abbr-list-filter"
      />
      <ul className={styles.abbrList}>
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
    </div>
  );
}
