import React, {useState, useEffect} from 'react';

export default function AbbrListComponent() {
  const [filterValue, setFilterValue] = useState('');
  const [abbrList, setAbbrList] = useState({});
  const [filteredAbbrList, setFilteredAbbrList] = useState({});

  useEffect(() => {
    fetch('http://localhost:3000/api/v1/list')
      .then(response => response.json())
      .then(json => {
        setFilteredAbbrList(json);
        setAbbrList(json);
      });
  }, []);

  const handleFilterValueChange = e => {
    let newFilterValue = e.target.value.toUpperCase();
    setFilterValue(newFilterValue);
    if (newFilterValue !== '') {
      setFilteredAbbrList(
        Object.fromEntries(
          Object.entries(abbrList).filter(([abbrKey, abbrValue]) =>
            abbrKey.includes(newFilterValue)
          )
        )
      );
    } else {
      setFilteredAbbrList(abbrList);
    }
  };

  return (
    <>
      <input
        type="text"
        value={filterValue}
        onChange={handleFilterValueChange}
      />
      <ul>
        {Object.keys(filteredAbbrList).map(
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
    </>
  );
}
