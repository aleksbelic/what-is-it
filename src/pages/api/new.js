import Database from 'better-sqlite3';
import path from 'path';

export default function addNewAbbr(req, res) {
  const body = req.body;
  const newAbbrKey = body.newAbbrKey.trim();
  const newAbbrValue = body.newAbbrValue.trim();

  if (!newAbbrKey || !newAbbrValue) {
    return res
      .status(400)
      .json({errMsg: 'Invalid input, new abbreviation could not be added.'});
  }

  try {
    const db = new Database(path.join(process.cwd(), '/data/abbr-list.db'), {
      readonly: false,
      fileMustExist: true,
    });

    const transaction = db.transaction(() => {
      db.prepare('INSERT INTO abbr (name) VALUES (?)').run(newAbbrKey);
      db.prepare('INSERT INTO meaning (text) VALUES (?)').run(newAbbrValue);
      const newAbbrId = db
        .prepare('SELECT id FROM abbr WHERE name = ?')
        .pluck()
        .get(newAbbrKey);
      const newMeaningId = db
        .prepare('SELECT id FROM meaning WHERE text = ? ORDER by id DESC')
        .pluck()
        .get(newAbbrValue);
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
