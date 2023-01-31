const {app} = require('./app');

const port = 3003;
const apiVersion = '1';
const abbrListPath = '../data/abbr-list.json';
const abbrList = require(abbrListPath);

function initAPI() {
  app.get(`/api/v${apiVersion}`, (req, res) => {
    res.send(
      `Welcome to "What is IT" (v${apiVersion}) - a user-friendly API for deciphering abbreviated IT terms 📚`
    );
  });

  app.get(`/api/v${apiVersion}/list`, (req, res) => {
    res.json(Object.keys(abbrList));
  });

  app.get(`/api/v${apiVersion}/count`, (req, res) => {
    res.send(Object.keys(abbrList).length.toString());
  });

  app.get(`/api/v${apiVersion}/:abbr`, (req, res) => {
    const abbr = req.params.abbr.toUpperCase();
    const fullForm = abbrList[abbr];
    res.send(fullForm);
  });

  app.listen(port, () => {
    console.log(`Yippee Ki-Yay! 🙌\n"What is IT" API is up & running... 🥳`);
  });
}

module.exports = {
  initAPI,
};
