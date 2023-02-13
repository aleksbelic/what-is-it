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

    fetch(endpoint, options)
      .then(resJson => resJson.json())
      .then(res => {
        alert(res.msg);
        setNewAbbrKey('');
        setNewAbbrValue('');
      });
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
          onChange={e => setNewAbbrKey(e.target.value.trim())}
          pattern="[a-zA-Z0-9]{1,20}"
          title="Abbreviation name should be only alphabets (a to z) or digits (0 to 9), no more than 20 chars long."
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
          title="Abbreviation meaning should be only alphabets (a to z), digits (0 to 9) or white space, no more than 50 chars long."
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
