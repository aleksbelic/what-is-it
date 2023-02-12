import {useState} from 'react';

export default function AbbrImporterComponent() {
  const [newAbbrKey, setNewAbbrKey] = useState('');
  const [newAbbrValue, setNewAbbrValue] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();

    const newAbbrData = {
      newAbbrKey: e.target.newAbbrKey.value.trim(),
      newAbbrValue: e.target.newAbbrValue.value.trim(),
    };
    const newAbbrJSONdata = JSON.stringify(newAbbrData);
    const endpoint = '/api/v1/new';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: newAbbrJSONdata,
    };

    const response = await fetch(endpoint, options);
    const result = await response.json();
    alert(result.msg);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="new-abbr-key">New abbreviation:</label>
        <input
          id="new-abbr-key"
          type="text"
          name="newAbbrKey"
          value={newAbbrKey}
          onChange={e => setNewAbbrKey(e.target.value)}
          pattern="[a-zA-Z0-9]{1,20}"
          title="Abbreviation should be digits (0 to 9) or alphabets (a to z), no more than 20 chars."
          data-test="new-abbr-key"
          required
        />
        <label htmlFor="new-abbr-value">New abbreviation meaning:</label>
        <input
          id="new-abbr-value"
          type="text"
          name="newAbbrValue"
          value={newAbbrValue}
          onChange={e => setNewAbbrValue(e.target.value)}
          pattern="[a-zA-Z0-9 ]{1,50}"
          title="Abbreviation meaning should be digits (0 to 9) or alphabets (a to z), no more than 50 chars."
          data-test="new-abbr-value"
          required
        />
        <button
          type="submit"
          data-test="new-abbr-submit"
          disabled={newAbbrKey === '' || newAbbrValue === ''}
        >
          Add new abbreviation
        </button>
      </form>
    </>
  );
}
