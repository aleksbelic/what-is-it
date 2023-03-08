import React, {useState} from 'react';
import styles from '@/styles/Home.module.css';
import AbbrCounterComponent from '@/components/AbbrCounterComponent';

export default function AbbrListComponent({abbrList}) {
  const [filterValue, setFilterValue] = useState('');
  let filteredAbbrList = getFilteredAbbrList();
  let abbrCount = Object.keys(filteredAbbrList).length;

  function getFilteredAbbrList() {
    return Object.fromEntries(
      Object.entries(abbrList).filter(([abbrKey, abbrValue]) =>
        abbrKey.toUpperCase().includes(filterValue.toUpperCase())
      )
    );
  }

  function handleFilterChange(e) {
    setFilterValue(e.target.value);
    filteredAbbrList = getFilteredAbbrList();
    abbrCount = Object.keys(filteredAbbrList).length;
  }

  return (
    <div className={styles.abbrListWrapper}>
      <div className={styles.abbrListFilterWrapper}>
        <AbbrCounterComponent abbrCount={abbrCount} />
        <input
          className={styles.abbrListFilter}
          type="text"
          value={filterValue}
          placeholder="Search..."
          onChange={handleFilterChange}
          data-testid="abbr-list-filter"
        />
      </div>
      <ul className={styles.abbrList}>
        {Object.keys(filteredAbbrList).map(
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
