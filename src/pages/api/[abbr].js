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
      .get(abbrName.toUpperCase());

    if (typeof abbrId === 'undefined') {
      res.status(200).json({message: `Abbreviation ${abbrName} not found.`});
    } else {
      // TODO
      res.status(200).json({message: 'ok'});
    }

    db.close();
  } catch (errObj) {
    return res.status(500).json({errMsg: errObj.message});
  }
}
