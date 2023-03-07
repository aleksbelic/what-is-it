import {useState} from 'react';
import styles from '@/styles/Home.module.css';

export default function AbbrImporterComponent({getAbbrsWithMeanings}) {
  const [newAbbrKey, setNewAbbrKey] = useState('');
  const [newAbbrValue, setNewAbbrValue] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();

    const newAbbrData = {
      newAbbrKey: e.target.newAbbrKey.value.trim(),
      newAbbrValue: e.target.newAbbrValue.value.trim(),
    };
    const newAbbrJSONdata = JSON.stringify(newAbbrData);
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: newAbbrJSONdata,
    };

    try {
      const fetchResponse = await fetch('/api/new', fetchOptions);
      const fetchedData = await fetchResponse.json();
      if (fetchResponse.ok) {
        setNewAbbrKey('');
        setNewAbbrValue('');
        alert('✔️ New abbreviation added successfuly.');
        getAbbrsWithMeanings();
      } else {
        throw new Error(fetchedData.errMsg);
      }
    } catch (errObj) {
      alert(`❌ ${errObj.message}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      autoComplete="off"
      className={styles.abbrImporter}
    >
      <fieldset>
        <legend>New abbreviation</legend>

        <input
          type="text"
          name="newAbbrKey"
          placeholder="Abbreviation text"
          value={newAbbrKey}
          onChange={e => setNewAbbrKey(e.target.value.trim())}
          pattern="[a-zA-Z0-9]{1,20}"
          title="Abbreviation name should be only alphabets (a to z) or digits (0 to 9), no more than 20 chars long."
          data-testid="new-abbr-key"
          required
        />
        <input
          type="text"
          name="newAbbrValue"
          placeholder="Abbreviation meaning"
          value={newAbbrValue}
          onChange={e => setNewAbbrValue(e.target.value)}
          pattern="[a-zA-Z0-9 '-:()]{1,100}"
          title="Only valid characters and no more than 100 chars long."
          data-testid="new-abbr-value"
          required
        />
        <button
          type="submit"
          data-testid="new-abbr-submit"
          disabled={newAbbrKey === '' || newAbbrValue === ''}
        >
          <b>SUBMIT</b>
        </button>
      </fieldset>
    </form>
  );
}
