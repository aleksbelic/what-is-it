import Database from 'better-sqlite3';
import path from 'path';

export default function getAllAbbrsWithMeanings(req, res) {
  try {
    const db = new Database(path.join(process.cwd(), '/data/abbr-list.db'), {
      readonly: true,
      fileMustExist: true,
    });

    const getAllAbbrsWithMeaningQuery =
      'SELECT abbr.name, meaning.text from abbr INNER JOIN abbr_meaning ON abbr_meaning.abbr_id = abbr.id INNER JOIN meaning on abbr_meaning.meaning_id = meaning.id ORDER BY abbr.name';

    const abbrsData = db.prepare(getAllAbbrsWithMeaningQuery).all();
    const allAbbrWithMeanings = abbrsData.reduce((acc, abbr) => {
      if (!acc[abbr.name]) {
        acc[abbr.name] = [abbr.text];
      } else {
        acc[abbr.name].push(abbr.text);
      }
      return acc;
    }, {});

    db.close();
    res.status(200).json(allAbbrWithMeanings);
  } catch (errObj) {
    res.status(500).json({errMsg: errObj.message});
  }
}
