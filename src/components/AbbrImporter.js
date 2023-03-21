import {useState} from 'react';
import styles from '@/styles/Home.module.css';

export default function AbbrImporter({getAbbrsWithMeanings}) {
  const [newAbbrName, setNewAbbrName] = useState('');
  const [newAbbrMeaning, setNewAbbrMeaning] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();

    const newAbbrData = {
      newAbbrName: e.target.newAbbrName.value.trim(),
      newAbbrMeaning: e.target.newAbbrMeaning.value.trim(),
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
        setNewAbbrName('');
        setNewAbbrMeaning('');
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
          name="newAbbrName"
          placeholder="Abbreviation text"
          value={newAbbrName}
          onChange={e => setNewAbbrName(e.target.value.trim())}
          pattern="[a-zA-Z0-9]{1,20}"
          title="Abbreviation name should be only alphabets (a to z) or digits (0 to 9), no more than 20 chars long."
          data-testid="new-abbr-name"
          required
        />
        <input
          type="text"
          name="newAbbrMeaning"
          placeholder="Abbreviation meaning"
          value={newAbbrMeaning}
          onChange={e => setNewAbbrMeaning(e.target.value)}
          pattern="[a-zA-Z0-9 '-:()]{1,100}"
          title="Only valid characters and no more than 100 chars long."
          data-testid="new-abbr-meaning"
          required
        />
        <button
          type="submit"
          data-testid="new-abbr-submit"
          disabled={newAbbrName === '' || newAbbrMeaning === ''}
        >
          <b>SUBMIT</b>
        </button>
      </fieldset>
    </form>
  );
}
