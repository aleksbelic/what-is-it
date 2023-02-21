import sqlite3 from 'sqlite3';
import {open} from 'sqlite';
import path from 'path';

export default async function getAllAbbrsWithMeanings(req, res) {
  try {
    const db = await open({
      filename: path.join(process.cwd(), '/data/abbr-list.db'),
      mode: sqlite3.OPEN_READONLY,
      driver: sqlite3.Database,
    });

    const getAllAbbrsWithMeaningQuery =
      'SELECT abbr.name, meaning.text from abbr INNER JOIN abbr_meaning ON abbr_meaning.abbr_id = abbr.id INNER JOIN meaning on abbr_meaning.meaning_id = meaning.id ORDER BY abbr.name';

    const abbrsData = await db.all(getAllAbbrsWithMeaningQuery);
    const allAbbrWithMeanings = abbrsData.reduce((acc, abbr) => {
      if (!acc[abbr.name]) {
        acc[abbr.name] = [abbr.text];
      } else {
        acc[abbr.name].push(abbr.text);
      }
      return acc;
    }, {});

    await db.close();
    res.status(200).json(allAbbrWithMeanings);
  } catch (errObj) {
    res.status(500).json({errMsg: errObj.message});
  }
}
