export default function AbbrImporterComponent() {
  const handleSubmit = async e => {
    e.preventDefault();

    const newAbbrData = {
      newAbbrKey: e.target.newAbbrKey.value,
      newAbbrValue: e.target.newAbbrValue.value,
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
    alert(`New Abbr data: ${result.data}`);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="new-abbr-key">New abbreviation:</label>
        <input
          id="new-abbr-key"
          type="text"
          name="newAbbrKey"
          pattern="[a-zA-Z0-9]{1,20}"
          title="Abbreviation should be digits (0 to 9) or alphabets (a to z), no more than 20 chars."
          required
        />
        <label htmlFor="new-abbr-value">New abbreviation meaning:</label>
        <input
          id="new-abbr-value"
          type="text"
          name="newAbbrValue"
          pattern="[a-zA-Z0-9]{1,50}"
          title="Abbreviation meaning should be digits (0 to 9) or alphabets (a to z), no more than 50 chars."
          required
        />
        <button type="submit">Add new abbr</button>
      </form>
    </>
  );
}
