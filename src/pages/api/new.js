import sqlite3 from 'sqlite3';
import {open} from 'sqlite';
import path from 'path';

export default async function addNewAbbr(req, res) {
  const body = req.body;
  const newAbbrKey = body.newAbbrKey.trim().toUpperCase();
  const newAbbrValue = body.newAbbrValue.trim();

  if (!newAbbrKey || !newAbbrValue) {
    return res
      .status(400)
      .json({errMsg: '❌ Invalid input, new abbreviation could not be added.'});
  }

  try {
    const db = await open({
      filename: path.join(process.cwd(), '/data/abbr-list.db'),
      mode: sqlite3.OPEN_READWRITE,
      driver: sqlite3.Database,
    });

    await db.exec(
      'BEGIN TRANSACTION;' +
        `INSERT INTO abbr (name) VALUES ('${newAbbrKey}');` +
        `INSERT INTO meaning (text) VALUES ('${newAbbrValue}');` +
        `INSERT INTO abbr_meaning (abbr_id, meaning_id) VALUES ((SELECT id FROM abbr WHERE name = '${newAbbrKey}'), (SELECT id FROM meaning WHERE text = '${newAbbrValue}'));` +
        'COMMIT;'
    );

    await db.close();

    res.status(200).json({msg: 'ok'});
  } catch (errObj) {
    res.status(500).json({errMsg: errObj.message});
  }
}
