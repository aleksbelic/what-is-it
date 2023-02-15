import sqlite3 from 'sqlite3';
import path from 'path';

export default function newAbbr(req, res) {
  const body = req.body;
  let newAbbrKey = body.newAbbrKey.toUpperCase();
  let newAbbrValue = body.newAbbrValue;

  if (!newAbbrKey || !newAbbrValue) {
    return res
      .status(400)
      .json({msg: '❌ Invalid input, new abbreviation could not be added.'});
  }

  /*
  // TODO: check if duplicate
  abbrList[newAbbrKey] = newAbbrValue;

  let sortedAbbrList = Object.keys(abbrList)
    .sort()
    .reduce((unsortedList, currValue) => {
      unsortedList[currValue] = abbrList[currValue];
      return unsortedList;
    }, {});

  fs.writeFile(
    path.join(process.cwd(), '/data/abbr-list.json'),
    JSON.stringify(sortedAbbrList),
    err => {
      if (err) {
        res.status(500).json({msg: '❌ New abbreviation could not be saved.'});
      } else {
        res.status(200).json({msg: 'New abbreviation successfuly saved.'});
      }
    }
  );
  */

  const db = new sqlite3.Database(
    path.join(process.cwd(), '/data/abbr-list.db'),
    err => {
      if (err) {
        res.status(500).json({msg: `❌ ${err.message}`});
      }
    }
  );

  db.serialize(() => {
    db.run(`INSERT INTO abbr (name) VALUES ('${newAbbrKey}')`);
    db.run(`INSERT INTO meaning (text) VALUES ('${newAbbrValue}')`);
    db.run(
      `INSERT INTO abbr_meaning (abbr_id, meaning_id) VALUES ((SELECT id FROM abbr WHERE name = '${newAbbrKey}'), (SELECT id FROM meaning WHERE text = '${newAbbrValue}'))`
    );
    res.status(200).json({msg: '✔️ New abbreviation successfuly saved.'});
  });

  db.close(err => {
    if (err) {
      res.status(500).json({msg: `❌ ${err.message}`});
    }
  });
}
