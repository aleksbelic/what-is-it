import Database from 'better-sqlite3';
import path from 'path';

export default function getMeaningForAbbrWithName(req, res) {
  if (req.method !== 'GET') {
    return res
      .status(400)
      .json({message: 'Invalid request, please use GET method.'});
  }

  const abbrName = req.query.abbr;

  try {
    const db = new Database(path.join(process.cwd(), '/data/abbr-list.db'), {
      readonly: false,
      fileMustExist: true,
    });

    let abbrId = db
      .prepare('SELECT id FROM abbr WHERE UPPER(name) = ?')
      .pluck()
      .get(abbrName.toUpperCase());

    if (typeof abbrId === 'undefined') {
      res.status(404).json({errMsg: `Abbreviation ${abbrName} not found.`});
    } else {
      let abbrMeaning = db
        .prepare(
          'SELECT meaning.text FROM meaning INNER JOIN abbr_meaning ON abbr_meaning.meaning_id = meaning.id WHERE abbr_meaning.abbr_id = ? ORDER BY meaning.text COLLATE NOCASE ASC'
        )
        .pluck()
        .all(abbrId);

      if (abbrMeaning.length === 1) {
        abbrMeaning = abbrMeaning[0];
      }

      return res.status(200).json({meaning: abbrMeaning});
    }

    db.close();
  } catch (errObj) {
    return res.status(500).json({errMsg: errObj.message});
  }
}
