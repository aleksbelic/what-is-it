const express = require('express');
const app = express();
const port = 3003;
const abbrList = require('./abbr-list.json');

app.get('/', (req, res) => {
  res.send(
    'Welcome to "What is IT" - user-friendly API for deciphering abbreviated IT terms'
  );
});

app.get('/list', (req, res) => {
  res.send(Object.keys(abbrList));
});

app.get('/count', (req, res) => {
  res.send(Object.keys(abbrList).length.toString());
});

app.get('/:abbr', (req, res) => {
  const abbr = req.params.abbr.toUpperCase();
  const fullForm = abbrList[abbr];
  res.send(fullForm);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
