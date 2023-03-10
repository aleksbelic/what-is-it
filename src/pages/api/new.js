import Database from 'better-sqlite3';
import path from 'path';

export default function addNewAbbr(req, res) {
  const body = req.body;
  const newAbbrName = body.newAbbrName.trim();
  const newAbbrMeaning = body.newAbbrMeaning.trim();

  if (!newAbbrName || !newAbbrMeaning) {
    return res
      .status(400)
      .json({errMsg: 'Invalid input, new abbreviation could not be added.'});
  }

  try {
    const db = new Database(path.join(process.cwd(), '/data/abbr-list.db'), {
      readonly: false,
      fileMustExist: true,
    });

    // check if abbr already exists
    //let abbrThatAlreadyExists = db.prepare('SELECT * from abbr WHERE name = ?').run()

    const transaction = db.transaction(() => {
      db.prepare('INSERT INTO abbr (name) VALUES (?)').run(newAbbrName);
      db.prepare('INSERT INTO meaning (text) VALUES (?)').run(newAbbrMeaning);
      const newAbbrId = db
        .prepare('SELECT id FROM abbr WHERE name = ?')
        .pluck()
        .get(newAbbrName);
      const newMeaningId = db
        .prepare('SELECT id FROM meaning WHERE text = ? ORDER by id DESC')
        .pluck()
        .get(newAbbrMeaning);
      db.prepare(
        'INSERT INTO abbr_meaning (abbr_id, meaning_id) VALUES (?, ?)'
      ).run(newAbbrId, newMeaningId);
    });
    transaction();
    db.close();

    res.status(200).json({msg: 'ok'});
  } catch (errObj) {
    res.status(500).json({errMsg: errObj.message});
  }
}
